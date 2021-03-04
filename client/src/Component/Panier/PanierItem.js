import React from 'react'

const PanierItem = ({produit}) => {
    return (
        <div className="pannier-item">
           <div>
           <img src={produit.ImageProduit} className="img-panier" alt="produitimg"/>
           </div>
                <div className='panier-info'>
                <h1>{produit.NameProduit}</h1>
                    <p>{produit.NameOwner}</p> 
                    <p>{produit.PhoneNumber}</p>
                    </div>
                    </div>
    )
}

export default PanierItem
