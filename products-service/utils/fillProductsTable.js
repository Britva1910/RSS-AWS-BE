"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const products_1 = require("../lambda-functions/products");
const allProducts = products_1.products;
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const main = async (product) => {
    const command = new lib_dynamodb_1.PutCommand({
        TableName: "Product",
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
exports.main = main;
allProducts.forEach((e) => {
    (0, exports.main)(e)
        .then(() => {
        console.log(`${e.title} was added`);
    })
        .catch((err) => {
        console.log(`${e.title} was not added due to an error`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsbFByb2R1Y3RzVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxsUHJvZHVjdHNUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBMEQ7QUFDMUQsd0RBQTJFO0FBQzNFLDJEQUF3RDtBQUd4RCxNQUFNLFdBQVcsR0FBRyxtQkFBUSxDQUFDO0FBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksZ0NBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QyxNQUFNLFNBQVMsR0FBRyxxQ0FBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFL0MsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLE9BQWtCLEVBQUUsRUFBRTtJQUMvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFVLENBQUM7UUFDN0IsU0FBUyxFQUFFLFNBQVM7UUFDcEIsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztZQUNwQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDckI7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFkVyxRQUFBLElBQUksUUFjZjtBQUVGLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN4QixJQUFBLFlBQUksRUFBQyxDQUFDLENBQUM7U0FDSixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGdDQUFnQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50IH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1keW5hbW9kYlwiO1xyXG5pbXBvcnQgeyBQdXRDb21tYW5kLCBEeW5hbW9EQkRvY3VtZW50Q2xpZW50IH0gZnJvbSBcIkBhd3Mtc2RrL2xpYi1keW5hbW9kYlwiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCIuLi9sYW1iZGEtZnVuY3Rpb25zL3Byb2R1Y3RzXCI7XHJcbmltcG9ydCB7IElQcm9kdWN0cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvZHVjdHNcIjtcclxuXHJcbmNvbnN0IGFsbFByb2R1Y3RzID0gcHJvZHVjdHM7XHJcbmNvbnN0IGNsaWVudCA9IG5ldyBEeW5hbW9EQkNsaWVudCh7fSk7XHJcbmNvbnN0IGRvY0NsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShjbGllbnQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1haW4gPSBhc3luYyAocHJvZHVjdDogSVByb2R1Y3RzKSA9PiB7XHJcbiAgY29uc3QgY29tbWFuZCA9IG5ldyBQdXRDb21tYW5kKHtcclxuICAgIFRhYmxlTmFtZTogXCJQcm9kdWN0XCIsXHJcbiAgICBJdGVtOiB7XHJcbiAgICAgIGRlc2NyaXB0aW9uOiBwcm9kdWN0LmRlc2NyaXB0aW9uLFxyXG4gICAgICBpZDogcHJvZHVjdC5pZCxcclxuICAgICAgcHJpY2U6IHByb2R1Y3QucHJpY2UsXHJcbiAgICAgIHRpdGxlOiBwcm9kdWN0LnRpdGxlLFxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkb2NDbGllbnQuc2VuZChjb21tYW5kKTtcclxuICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgcmV0dXJuIHJlc3BvbnNlO1xyXG59O1xyXG5cclxuYWxsUHJvZHVjdHMuZm9yRWFjaCgoZSkgPT4ge1xyXG4gIG1haW4oZSlcclxuICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coYCR7ZS50aXRsZX0gd2FzIGFkZGVkYCk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coYCR7ZS50aXRsZX0gd2FzIG5vdCBhZGRlZCBkdWUgdG8gYW4gZXJyb3JgKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl19