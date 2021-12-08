// Server code source: https://deno.land/manual@v1.16.4/examples/http_server

const server: Deno.Listener = Deno.listen({port: 8080});
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const connection: AsyncIterable<Deno.Conn> of server) {
    serveHttp(connection); // not using await => non blocking
}

async function serveHttp(connection: Deno.Conn) {
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