import React from 'react';
import { Link } from 'react-router-dom';

const ContactList = ({
  contacts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!contacts.length) {
    return <h3>No Contacts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {contacts &&
        contacts.map((contact) => (
          <div key={contact._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${contact.contactAuthor}`}
                >
                  {contact.contactAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this contact on {contact.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this contact on {contact.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{contact.contactText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/contacts/${contact._id}`}
            >
              Join the discussion on this contact.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ContactList;
