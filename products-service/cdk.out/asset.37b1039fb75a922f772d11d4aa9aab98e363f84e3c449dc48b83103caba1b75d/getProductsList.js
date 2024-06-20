"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("./products");
exports.handler = async function (event) {
    const products = products_1.products;
    if (products.length === 0) {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Products not found" }),
        };
    }
    else {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(products),
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdHNMaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0UHJvZHVjdHNMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQWtEO0FBR2xELE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLEtBQTJCO0lBQzNELE1BQU0sUUFBUSxHQUFnQixtQkFBUSxDQUFDO0lBRXZDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUMxQixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsZUFBZSxFQUFFLFVBQVU7Z0JBQzNCLDZCQUE2QixFQUFFLEdBQUc7YUFDbkM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDO1NBQ3hELENBQUM7SUFDSixDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsVUFBVTtnQkFDM0IsNkJBQTZCLEVBQUUsR0FBRzthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztTQUMvQixDQUFDO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50IH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHsgcHJvZHVjdHMgYXMgUHJvZHVjdHMgfSBmcm9tIFwiLi9wcm9kdWN0c1wiO1xyXG5pbXBvcnQgeyBJUHJvZHVjdHMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2R1Y3RzXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KSB7XHJcbiAgY29uc3QgcHJvZHVjdHM6IElQcm9kdWN0c1tdID0gUHJvZHVjdHM7XHJcblxyXG4gIGlmIChwcm9kdWN0cy5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJQcm9kdWN0cyBub3QgZm91bmRcIiB9KSxcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHByb2R1Y3RzKSxcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG4iXX0=