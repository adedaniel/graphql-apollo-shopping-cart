import { gql } from "@apollo/client";

export const FETCH_PRODUCTS_AND_CURRENCIES = (currency) => gql`
  query {
    products {
      id
      title
      price(currency: ${currency})
      image_url
      product_options {
        title
        prefix
        suffix
        options {
          id
          value
        }
      }
    }
    currency
  }
`;
