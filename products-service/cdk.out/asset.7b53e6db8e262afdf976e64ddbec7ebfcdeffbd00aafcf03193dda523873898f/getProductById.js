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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFrRDtBQUdsRCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssV0FBVyxLQUEyQjtJQUMzRCxNQUFNLFFBQVEsR0FBZ0IsbUJBQVEsQ0FBQztJQUN2QyxNQUFNLEVBQUUsR0FBVyxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFFbEQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzFCLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsVUFBVTtnQkFDM0IsNkJBQTZCLEVBQUUsR0FBRzthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLENBQUM7U0FDakUsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRWxELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNiLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsVUFBVTtnQkFDM0IsNkJBQTZCLEVBQUUsR0FBRzthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUM7U0FDdkQsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPO1FBQ0wsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUU7UUFDL0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0tBQzlCLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7IHByb2R1Y3RzIGFzIFByb2R1Y3RzIH0gZnJvbSBcIi4vcHJvZHVjdHNcIjtcclxuaW1wb3J0IHsgSVByb2R1Y3RzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9kdWN0c1wiO1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudCkge1xyXG4gIGNvbnN0IHByb2R1Y3RzOiBJUHJvZHVjdHNbXSA9IFByb2R1Y3RzO1xyXG4gIGNvbnN0IGlkOiBzdHJpbmcgPSBldmVudC5wYXRoUGFyYW1ldGVycz8uaWQgfHwgXCJcIjtcclxuXHJcbiAgaWYgKHByb2R1Y3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNDAwLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwibm8tY2FjaGVcIixcclxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiBcIlByb2R1Y3RzIGRhdGEgZG9lc24ndCBleGlzdFwiIH0pLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByb2R1Y3QgPSBwcm9kdWN0cy5maW5kKChpKSA9PiBpLmlkID09PSBpZCk7XHJcblxyXG4gIGlmICghcHJvZHVjdCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNDA0LFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwibm8tY2FjaGVcIixcclxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiBcIlByb2R1Y3Qgbm90IGZvdW5kXCIgfSksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHByb2R1Y3QpLFxyXG4gIH07XHJcbn07XHJcbiJdfQ==