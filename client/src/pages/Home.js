import React from 'react';
import { useQuery } from '@apollo/client';

import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';

import { QUERY_CONTACTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_CONTACTS);
  const contacts = data?.contacts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ContactForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ContactList
              contacts={contacts}
              title="Here are your contact(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
