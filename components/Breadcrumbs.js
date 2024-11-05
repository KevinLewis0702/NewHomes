import React from 'react';
import Link from 'next/link';

// Function to capitalize the first letter of each word
const capitalizeFirstLetter = (string) => {
  return string
    .replace(/-/g, ' ') // Replace all dashes with spaces
    .replace(/\b\w/g, (s) => s.toUpperCase()); // Capitalize the first letter of each word
};

const Breadcrumbs = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb" style={{ display: 'flex' }}>
      <ol className="breadcrumb" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex' }}>
        {crumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            <li
              className={`breadcrumb-item ${!crumb.href ? 'active' : ''} ${i === crumbs.length - 1 ? 'last-crumb' : ''}`}
              style={{ 
                marginRight: '0.5rem', 
                padding: '0.25rem 0', 
                fontWeight: i === crumbs.length - 1 ? 'bold' : 'normal', 
                fontSize: '0.9rem', 
                textDecoration: 'none' 
              }}
            >
              {crumb.href ? (
                <Link href={crumb.href}>
                  <div style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}>
                    {capitalizeFirstLetter(decodeURIComponent(crumb.title))}
                  </div>
                </Link>
              ) : (
                <span style={{ color: '#6c757d' }}>
                  {capitalizeFirstLetter(decodeURIComponent(crumb.title))}
                </span>
              )}
            </li>
            {i < crumbs.length - 1 && (
              <span style={{ color: '#6c757d', margin: '0 0.25rem' }}>/</span> // Increased spacing around separators
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
