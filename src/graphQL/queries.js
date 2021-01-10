import { gql } from "@apollo/client";

// GraphQL query to fetch all products and currencies
// Accepts currency code as parameter to display respective price
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
