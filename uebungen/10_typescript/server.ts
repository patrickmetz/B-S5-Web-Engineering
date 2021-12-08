class Covid19StatisticsServer {
    private readonly _httpServer: Deno.Listener;

    constructor(serverPort: number) {
        this._httpServer = this.createServer(serverPort);
        this.serveAllHttpConnections();
    }

    private createServer(port: number) {
        console.log(`Covid 19 statistics server is listening at: http://localhost:${port}/`);
        return Deno.listen({port: port});
    }

    private async serveAllHttpConnections(): Promise<void> {
        let connection : Deno.Conn; // can't declare type in for/of-loop

        for await (connection of this._httpServer) {
            this.serveOneHttpConnection(connection); // not using await => non blocking
        }
    }

    private async serveOneHttpConnection(connection: Deno.Conn): Promise<void> {
        const httpConnection: Deno.HttpConn = Deno.serveHttp(connection);

        for await (const requestEvent of httpConnection) {
            const body = `Your user-agent is:\n\n${
                requestEvent.request.headers.get(
                    "user-agent",
                ) ?? "Unknown"
            }`;
            requestEvent.respondWith(
                new Response(body, {
                    status: 200,
                }),
            );
        }
    }
}


const server = new Covid19StatisticsServer(
    8080
);

