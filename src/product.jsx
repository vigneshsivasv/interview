import styled from "styled-components";

const Card = styled.div`
  width: 280px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0 0 8px;
`;

const Description = styled.p`
  color: #666;
  font-size: 14px;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #222;
  color: white;
  cursor: pointer;
`;

function ProductCard({ product }) {
  console.log("product", product)
    return (
    <Card>
      <Image src={product.thumbnail} alt={product.title} />

      <Content>
        <Title>{product.title}</Title>

        <Description>
          {product.description}
        </Description>

        <Price>${product.price}</Price>

        <Button>Add to Cart</Button>
      </Content>
    </Card>
    );
}

export default ProductCard;