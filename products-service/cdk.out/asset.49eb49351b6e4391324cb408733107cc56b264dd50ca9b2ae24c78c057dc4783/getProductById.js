"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("./products");
exports.handler = async function (event) {
    const products = products_1.products;
    const id = event.pathParameters?.id;
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
    if (!id) {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Missing 'id' parameter in request" }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFrRDtBQUdsRCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssV0FBVyxLQUEyQjtJQUMzRCxNQUFNLFFBQVEsR0FBZ0IsbUJBQVEsQ0FBQztJQUN2QyxNQUFNLEVBQUUsR0FBdUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7SUFFeEQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzFCLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsVUFBVTtnQkFDM0IsNkJBQTZCLEVBQUUsR0FBRzthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLENBQUM7U0FDakUsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDUixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsZUFBZSxFQUFFLFVBQVU7Z0JBQzNCLDZCQUE2QixFQUFFLEdBQUc7YUFDbkM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxDQUFDO1NBQ3ZFLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUVsRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsZUFBZSxFQUFFLFVBQVU7Z0JBQzNCLDZCQUE2QixFQUFFLEdBQUc7YUFDbkM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDO1NBQ3ZELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRTtRQUN6QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7S0FDOUIsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50IH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHsgcHJvZHVjdHMgYXMgUHJvZHVjdHMgfSBmcm9tIFwiLi9wcm9kdWN0c1wiO1xyXG5pbXBvcnQgeyBJUHJvZHVjdHMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2R1Y3RzXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KSB7XHJcbiAgY29uc3QgcHJvZHVjdHM6IElQcm9kdWN0c1tdID0gUHJvZHVjdHM7XHJcbiAgY29uc3QgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGV2ZW50LnBhdGhQYXJhbWV0ZXJzPy5pZDtcclxuXHJcbiAgaWYgKHByb2R1Y3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNDAwLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwibm8tY2FjaGVcIixcclxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiBcIlByb2R1Y3RzIGRhdGEgZG9lc24ndCBleGlzdFwiIH0pLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmICghaWQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJNaXNzaW5nICdpZCcgcGFyYW1ldGVyIGluIHJlcXVlc3RcIiB9KSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9kdWN0ID0gcHJvZHVjdHMuZmluZCgoaSkgPT4gaS5pZCA9PT0gaWQpO1xyXG5cclxuICBpZiAoIXByb2R1Y3QpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwNCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJQcm9kdWN0IG5vdCBmb3VuZFwiIH0pLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpblwiIH0sXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwcm9kdWN0KSxcclxuICB9O1xyXG59O1xyXG4iXX0=