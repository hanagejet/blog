import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Post } from '../../types/post';

interface Props {
  post: Post;
}

const Container = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 120px;
`;
const Date = styled.div`
  font-size: 12px;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 40px;
`;
const Body = styled.article`
  line-height: 1.9;
`;
const Content = styled.div`
  > * {
    margin: 28px 0 0;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 18px;
  }
  img {
    max-width: 100%;
    width: auto;
    margin: auto;
    display: block;
    border-radius: 8px;
  }
  ul {
    list-style-position: inside;
  }
  ol {
    list-style-position: inside;
  }
  > ul,
  ol {
    padding: 0;
  }
  pre {
    overflow-x: auto;
    background: ${rgba('#000', 0.08)};
    border-radius: 8px;
    line-height: 1.8;
    padding: 24px;
    > code {
      padding: 0;
      border: 0;
      background: 0;
    }
  }
  code {
    padding: 4px 8px;
    border-radius: 6px;
    background: ${rgba('#000', 0.08)};
  }
  a {
    text-decoration: underline;
    color: #000;
  }
`;

export const Article: React.FC<Props> = ({ post, ...other }) => {
  const { title, date, content } = post;

  return (
    <Container {...other}>
      <Body>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </Body>
    </Container>
  );
};