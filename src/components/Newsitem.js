import React from 'react'

const  Newsitem=(props)=> {

    
        let {title,description,imageUrl,newsUrl,author,date}=props;
        return (
          <div>
            <div className="card" style={{ width: '18rem' }}>
              <img src={imageUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">
                  Read More...
                </a>
                <p className="card-text"><small className="text-body-secondary">Published by by {author} on {new Date(date).toGMTString()}</small></p>
              </div>
            </div>
          </div>
        );
      
}

export default Newsitem
