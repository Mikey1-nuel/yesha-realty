import React from 'react'

const productDetails = async ({ params }: { params: Promise<{ propertyId: string }> }) => {
    const propertyId = (await params).propertyId
  return (
    <h1>Details about property {propertyId}</h1>
  )
}

export default productDetails;