"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("./products");
exports.handler = async function (event) {
    const products = products_1.products;
    /* if (products.length === 0) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Products not found" }),
      };
    } else {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(products),
      };
    } */
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Products all" }),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdHNMaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0UHJvZHVjdHNMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQWtEO0FBR2xELE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLEtBQTJCO0lBQzNELE1BQU0sUUFBUSxHQUFnQixtQkFBUSxDQUFDO0lBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW9CSTtJQUVKLE9BQU87UUFDTCxVQUFVLEVBQUUsR0FBRztRQUNmLE9BQU8sRUFBRTtZQUNQLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsZUFBZSxFQUFFLFVBQVU7WUFDM0IsNkJBQTZCLEVBQUUsR0FBRztTQUNuQztRQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDO0tBQ2xELENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7IHByb2R1Y3RzIGFzIFByb2R1Y3RzIH0gZnJvbSBcIi4vcHJvZHVjdHNcIjtcclxuaW1wb3J0IHsgSVByb2R1Y3RzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9kdWN0c1wiO1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudCkge1xyXG4gIGNvbnN0IHByb2R1Y3RzOiBJUHJvZHVjdHNbXSA9IFByb2R1Y3RzO1xyXG5cclxuICAvKiBpZiAocHJvZHVjdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGF0dXNDb2RlOiA0MDAsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJuby1jYWNoZVwiLFxyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IFwiUHJvZHVjdHMgbm90IGZvdW5kXCIgfSksXHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJuby1jYWNoZVwiLFxyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwcm9kdWN0cyksXHJcbiAgICB9O1xyXG4gIH0gKi9cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJQcm9kdWN0cyBhbGxcIiB9KSxcclxuICB9O1xyXG59O1xyXG4iXX0=