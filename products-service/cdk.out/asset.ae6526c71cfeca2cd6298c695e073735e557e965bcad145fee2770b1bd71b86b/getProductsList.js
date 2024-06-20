"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = async function (event) {
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Hello, CDK! You've hit ${event.path}\n`,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvZHVjdHNMaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0UHJvZHVjdHNMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLFdBQVcsS0FBMkI7SUFDM0QsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRTtRQUN6QyxJQUFJLEVBQUUsMEJBQTBCLEtBQUssQ0FBQyxJQUFJLElBQUk7S0FDL0MsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50IH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIGZ1bmN0aW9uIChldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvcGxhaW5cIiB9LFxyXG4gICAgYm9keTogYEhlbGxvLCBDREshIFlvdSd2ZSBoaXQgJHtldmVudC5wYXRofVxcbmAsXHJcbiAgfTtcclxufTtcclxuIl19