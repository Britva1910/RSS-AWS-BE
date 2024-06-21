"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const products_1 = require("../lambda-functions/products");
const allProducts = products_1.products;
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const main = async (dbName, product) => {
    const command = new lib_dynamodb_1.PutCommand({
        TableName: dbName,
        Item: {
            description: product.description,
            id: product.id,
            price: product.price,
            title: product.title,
        },
    });
    const response = await docClient.send(command);
    console.log(response);
    return response;
};
allProducts.forEach((e) => {
    main("Product", e)
        .then(() => {
        console.log(`${e.title} was added`);
    })
        .catch((err) => {
        console.log(`${e.title} was not added due to an error`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsbFByb2R1Y3RzVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxsUHJvZHVjdHNUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhEQUEwRDtBQUMxRCx3REFBMkU7QUFDM0UsMkRBQXdEO0FBR3hELE1BQU0sV0FBVyxHQUFHLG1CQUFRLENBQUM7QUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sU0FBUyxHQUFHLHFDQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV0RCxNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsTUFBYyxFQUFFLE9BQWtCLEVBQUUsRUFBRTtJQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFVLENBQUM7UUFDN0IsU0FBUyxFQUFFLE1BQU07UUFDakIsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztZQUNwQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDckI7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFFRixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDZixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGdDQUFnQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50IH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1keW5hbW9kYlwiO1xyXG5pbXBvcnQgeyBQdXRDb21tYW5kLCBEeW5hbW9EQkRvY3VtZW50Q2xpZW50IH0gZnJvbSBcIkBhd3Mtc2RrL2xpYi1keW5hbW9kYlwiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9sYW1iZGEtZnVuY3Rpb25zL3Byb2R1Y3RzXCI7XHJcbmltcG9ydCB7IElQcm9kdWN0cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvZHVjdHNcIjtcclxuXHJcbmNvbnN0IGFsbFByb2R1Y3RzID0gcHJvZHVjdHM7XHJcbmNvbnN0IGNsaWVudCA9IG5ldyBEeW5hbW9EQkNsaWVudCh7fSk7XHJcbmNvbnN0IGRvY0NsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShjbGllbnQpO1xyXG5cclxuY29uc3QgbWFpbiA9IGFzeW5jIChkYk5hbWU6IHN0cmluZywgcHJvZHVjdDogSVByb2R1Y3RzKSA9PiB7XHJcbiAgY29uc3QgY29tbWFuZCA9IG5ldyBQdXRDb21tYW5kKHtcclxuICAgIFRhYmxlTmFtZTogZGJOYW1lLFxyXG4gICAgSXRlbToge1xyXG4gICAgICBkZXNjcmlwdGlvbjogcHJvZHVjdC5kZXNjcmlwdGlvbixcclxuICAgICAgaWQ6IHByb2R1Y3QuaWQsXHJcbiAgICAgIHByaWNlOiBwcm9kdWN0LnByaWNlLFxyXG4gICAgICB0aXRsZTogcHJvZHVjdC50aXRsZSxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG9jQ2xpZW50LnNlbmQoY29tbWFuZCk7XHJcbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gIHJldHVybiByZXNwb25zZTtcclxufTtcclxuXHJcbmFsbFByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcclxuICBtYWluKFwiUHJvZHVjdFwiLCBlKVxyXG4gICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHtlLnRpdGxlfSB3YXMgYWRkZWRgKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHtlLnRpdGxlfSB3YXMgbm90IGFkZGVkIGR1ZSB0byBhbiBlcnJvcmApO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXX0=