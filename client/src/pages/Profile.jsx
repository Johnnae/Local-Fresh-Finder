import { useState, useEffect } from 'react';
import {
  Card,
  Divider,
  Button,
  Row,
  Col,
  Space,
} from 'antd';

import Auth from '../utils/auth';
import { removeMarketId } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_MARKET } from '../utils/mutations';


const SavedBooks = () => {
  // create state to hold saved book data
  const { loading, data } = useQuery(GET_ME);
  const [removeBook, { error }] = useMutation(REMOVE_MARKET);

  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     const { data } = await removeBook({
        variables: { bookId }
      });
      console.error(err);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Divider>
          <h1>Viewing farmers markets!</h1>
        </Divider>
      </div>
      <Divider>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved farmers markets!'}
        </h2>
        <Row>
          {userData.savedBooks.map((markets) => {
            return (
              <Col>
                <Space direction="vertical" size={16}>
                  <Card
                    title="{Market}"
                    style={{
                      width: 300,
                    }}
                  >
                    <p>Date:</p>
                    <p>Time: </p>
                    <p>Location: </p>
                    <p>Items committed to: </p>
                  </Card>
                </Space>
              </Col>
            );
          })}
        </Row>
      </Divider>
    </>
  );
};

export default SavedBooks;
