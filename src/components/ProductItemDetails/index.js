import { Component } from "react";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";

import SimilarProductItem from "../SimilarProductItem";
import Header from "../Header";

import "./index.css";

const ApiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class ProductItemDetails extends Component {
  state = { data: {}, apiStatus: ApiStatusConstants.initial, count: 0 };

  componentDidMount() {
    this.fetchItemDetails();
  }

  fetchItemDetails = async () => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ apiStatus: ApiStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      `https://apis.ccbp.in/products/${id}`,
      options
    );
    if (response.ok) {
      const data = await response.json();
      const modifiedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        style: data.style,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
      };
      modifiedData.similarProducts = modifiedData.similarProducts.map(
        (obj) => ({
          id: obj.id,
          imageUrl: obj.image_url,
          title: obj.title,
          style: obj.style,
          price: obj.price,
          description: obj.description,
          brand: obj.brand,
          totalReviews: obj.total_reviews,
          rating: obj.rating,
          availability: obj.availability,
          similarProducts: obj.similar_products,
        })
      );
      console.log(modifiedData);
      this.setState({
        apiStatus: ApiStatusConstants.success,
        data: modifiedData,
      });
    } else {
      this.setState({ apiStatus: ApiStatusConstants.failure });
    }
  };

  increaseCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  decreaseCount = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };

  renderItemDetails = () => {
    const { apiStatus, data, count } = this.state;
    const {history} = this.props
    const continueShopping = () => history.push('/products')
    switch (apiStatus) {
      case ApiStatusConstants.success:
        return (
          <div className="productBody">
            <div className="flex">
              <img
                className="large-image"
                src={data.imageUrl}
                alt={data.title}
              />
              <div>
                <h1>{data.title}</h1>
                <p className="productPrice">Rs {data.price}/-</p>
                <div className="flex-col ">
                  <div className="rating-container">
                    <p className="rating">{data.rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p>{data.totalReviews} Reviews</p>
                </div>
                <p>{data.description}</p>
                <p>
                  <span className="bold">Available: </span>
                  {data.availability}
                </p>
                <p>
                  <span className="bold">Brand: </span>
                  {data.brand}
                </p>
                <hr />
                <div className="counter">
                  <button onClick={this.decreaseCount}>-</button>
                  <p>{count}</p>
                  <button onClick={this.increaseCount}>+</button>
                </div>
                <button className="primary-btn">ADD TO CART</button>
              </div>
            </div>
            <div>
              <h1 className="similarProducts">Similar Products</h1>
              <ul className="flex">
                {data.similarProducts.map((obj) => (
                  <SimilarProductItem key={obj.id} productsData={obj} />
                ))}
              </ul>
            </div>
          </div>
        );
      case ApiStatusConstants.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        );
      case ApiStatusConstants.failure:
        return (
          <div className="coverDiv">
            <div className="failureDiv">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                alt="error view"
              />
              <h1>Product Not Found</h1>
              <button onClick={continueShopping} className="primary-btn">Continue Shopping</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        {this.renderItemDetails()}
      </>
    );
  }
}

export default ProductItemDetails;
