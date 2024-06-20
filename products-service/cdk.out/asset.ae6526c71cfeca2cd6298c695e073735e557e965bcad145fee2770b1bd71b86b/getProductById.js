"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = async function (event) {
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Hello, CDK! You've hit ${event.path}\n`,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdEJ5SWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRQcm9kdWN0QnlJZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLEtBQTJCO0lBQzNELE9BQU87UUFDTCxVQUFVLEVBQUUsR0FBRztRQUNmLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUU7UUFDekMsSUFBSSxFQUFFLDBCQUEwQixLQUFLLENBQUMsSUFBSSxJQUFJO0tBQy9DLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3BsYWluXCIgfSxcclxuICAgIGJvZHk6IGBIZWxsbywgQ0RLISBZb3UndmUgaGl0ICR7ZXZlbnQucGF0aH1cXG5gLFxyXG4gIH07XHJcbn07XHJcbiJdfQ==