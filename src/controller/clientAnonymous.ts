import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

const projectKey: string = "ecommerce-trueorfalse";
const clientId: string = "Vz7HRKxOUN3XQ9Oa7ypNidqN";
const clientSecret: string = "imDLvOyvC0oZ364qW_bjeQgnAugLRqmc";
const scopes: string[] = [
  "manage_my_business_units:ecommerce-trueorfalse view_published_products:ecommerce-trueorfalse manage_my_profile:ecommerce-trueorfalse manage_my_shopping_lists:ecommerce-trueorfalse manage_my_payments:ecommerce-trueorfalse manage_products:ecommerce-trueorfalse manage_my_orders:ecommerce-trueorfalse view_categories:ecommerce-trueorfalse manage_customers:ecommerce-trueorfalse create_anonymous_token:ecommerce-trueorfalse manage_my_quotes:ecommerce-trueorfalse manage_my_quote_requests:ecommerce-trueorfalse manage_orders:ecommerce-trueorfalse",
];
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

class ClientsAnonymous {
  getAnonymousSessionFlowClient() {
    const authMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
      host: "https://auth.europe-west1.gcp.commercetools.com",
      projectKey: projectKey,
      credentials: {
        clientId: clientId,
        clientSecret: clientSecret,
      },
      scopes,
      fetch,
    };
    const ctpClient = new ClientBuilder()
      .withAnonymousSessionFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: projectKey,
    });
    return apiRoot;
  }
}
export default ClientsAnonymous;
