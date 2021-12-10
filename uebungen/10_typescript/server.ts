// start via "deno run --allow-net --allow-read"

interface CovidData {
    "Bundesland": string,
    "Anzahl": number,
    "Differenz zum Vortag": number,
    "Faelle in den letzten 7 Tagen": number,
    "7-Tage-Inzidenz": number,
    "Todesfaelle": number
}

interface SimpleStatistics {
    min: number,
    max: number,
    mean: number,
    sum: number
}

class Covid19StatisticsServer {
    // null type stops deno from complaining about fields initialized in IIFE
    private _covidData: CovidData[] | null = null;
    private _httpServer: Deno.Listener | null = null;

    constructor(serverPort: number, textFilePath: string) {
        (async () => {
            try {
                this._covidData = await this._readTextFileAsCovidData(textFilePath);
                this._httpServer = this._createServer(serverPort);
                this._serveAllHttpConnections();
            } catch (e) {
                console.error(e);
            }
        })();
    }

    private async _readTextFileAsCovidData(jsonFilePath: string): Promise<CovidData[]> {
        return JSON.parse(await Deno.readTextFile(jsonFilePath));
    }

    private _createServer(port: number): Deno.Listener {
        console.log(`Covid 19 statistics server is listening at: http://localhost:${port}/`);
        return Deno.listen({port: port});
    }

    private async _serveAllHttpConnections(): Promise<void> {
        if (this._httpServer !== null) {
            let connection: Deno.Conn; // can't declare type in for/of-loop

            for await (connection of this._httpServer) {
                this._serveOneHttpConnection(connection); // not using await => non blocking
            }
        }
    }

    private async _serveOneHttpConnection(connection: Deno.Conn): Promise<void> {
        const httpConnection: Deno.HttpConn = Deno.serveHttp(connection);

        for await (const requestEvent of httpConnection) {
            requestEvent.respondWith(
                new Response(this._htmlCode(), {
                    status: 200,
                    headers: {
                        'content-type': 'text/html; charset=UTF-8'
                    }
                }),
            );
        }
    }

    private _htmlCode(): string {
        if (this._covidData !== null) {
            const statistics = this._numbersToSimpleStatistics(
                this._covidData.map(x => x.Anzahl)
            );

            return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Covid19-Statistik</title>
                    
                    <style>
                        td:first-child{font-weight: bold};
                    </style>
                </head>
                <body>
                
                <h1>Covid19-Fälle in deutschen Bundesländern</h1>
                <table>
                    <tr><td>Minimale Anzahl</td><td>${statistics.min}</td></tr>
                    <tr><td>Maximale Anzahl</td><td>${statistics.max}</td></tr>
                    <tr><td>Durchschnitt</td><td>${statistics.mean}</td></tr>
                    <tr><td>Summe</td><td>${statistics.sum}</td></tr>
                </table>
                
                </body>
                </html>`;
        }
        return "";
    }

    private _numbersToSimpleStatistics(numbers: number[]): SimpleStatistics {
        // source: https://stackoverflow.com/a/1669222
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);

        // source: https://stackoverflow.com/a/10624256
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = Math.round(sum / numbers.length);

        return {min: min, max: max, mean: mean, sum: sum};
    }
}

new Covid19StatisticsServer(
    8080,
    './covid_19_fallzahlen_in_deutschland.json'
);
