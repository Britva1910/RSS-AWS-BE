"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("./products");
exports.handler = async function (event) {
    const products = products_1.products;
    const id = event.pathParameters?.id || "";
    if (products.length === 0) {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Products data doesn't exist" }),
        };
    }
    const product = products.find((i) => i.id === id);
    if (!product) {
        return {
            statusCode: 404,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Product not found" }),
        };
    }
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(product),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFrRDtBQUdsRCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssV0FBVyxLQUEyQjtJQUMzRCxNQUFNLFFBQVEsR0FBZ0IsbUJBQVEsQ0FBQztJQUN2QyxNQUFNLEVBQUUsR0FBVyxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFFbEQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzFCLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsVUFBVTtnQkFDM0IsNkJBQTZCLEVBQUUsR0FBRzthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLENBQUM7U0FDakUsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRWxELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNiLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsVUFBVTtnQkFDM0IsNkJBQTZCLEVBQUUsR0FBRzthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUM7U0FDdkQsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPO1FBQ0wsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFO1FBQ3pDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztLQUM5QixDQUFDO0FBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyBhcyBQcm9kdWN0cyB9IGZyb20gXCIuL3Byb2R1Y3RzXCI7XHJcbmltcG9ydCB7IElQcm9kdWN0cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvZHVjdHNcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIGZ1bmN0aW9uIChldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQpIHtcclxuICBjb25zdCBwcm9kdWN0czogSVByb2R1Y3RzW10gPSBQcm9kdWN0cztcclxuICBjb25zdCBpZDogc3RyaW5nID0gZXZlbnQucGF0aFBhcmFtZXRlcnM/LmlkIHx8IFwiXCI7XHJcblxyXG4gIGlmIChwcm9kdWN0cy5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJQcm9kdWN0cyBkYXRhIGRvZXNuJ3QgZXhpc3RcIiB9KSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9kdWN0ID0gcHJvZHVjdHMuZmluZCgoaSkgPT4gaS5pZCA9PT0gaWQpO1xyXG5cclxuICBpZiAoIXByb2R1Y3QpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwNCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJQcm9kdWN0IG5vdCBmb3VuZFwiIH0pLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpblwiIH0sXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwcm9kdWN0KSxcclxuICB9O1xyXG59O1xyXG4iXX0=