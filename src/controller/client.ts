import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

const projectKey: string = "ecommerce-trueorfalse";
const clientId: string = "LQc5POV2CRaRW22IL6I3zr6g";
const clientSecret: string = "jKc3vIr5CNtW-b1F-AHeO189bK_lRfpI";
const scopes: string[] = [
  "manage_my_business_units:ecommerce-trueorfalse view_published_products:ecommerce-trueorfalse manage_my_profile:ecommerce-trueorfalse manage_my_shopping_lists:ecommerce-trueorfalse manage_my_payments:ecommerce-trueorfalse manage_my_quote_requests:ecommerce-trueorfalse manage_products:ecommerce-trueorfalse manage_my_orders:ecommerce-trueorfalse view_categories:ecommerce-trueorfalse manage_customers:ecommerce-trueorfalse create_anonymous_token:ecommerce-trueorfalse manage_my_quotes:ecommerce-trueorfalse",
];
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

class Clients {
  getPasswordFlowClient(email: string, login: string) {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: "https://auth.europe-west1.gcp.commercetools.com",
      projectKey: projectKey,
      credentials: {
        clientId: clientId,
        clientSecret: clientSecret,
        user: {
          username: email,
          password: login,
        },
      },
      scopes,
      fetch,
    };
    const ctpClient = new ClientBuilder()
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: projectKey,
    });
    return apiRoot;
  }
}
export default Clients;
