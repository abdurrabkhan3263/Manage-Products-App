const conf = {
  appWriteUrl: String(import.meta.env.APPWRITE_END_POINT),
  appWriteProjectId: String(import.meta.env.APPWRITE_PROJECT_ID),

  //   COLLECTION IDS

  appWriteCustomerDetailsCollId: String(
    import.meta.env.APPWRITE_CUSTOMER_DETAILS_COLLECTION_ID
  ),
  appWriteProductsListCollId: String(
    import.meta.env.APPWRITE_PRODUCTS_LIST_COLLECTION_ID
  ),
  appWriteGraphData: String(import.meta.env.APPWRITE_GRAPH_DATA),
  appWriteCreateSell: String(import.meta.env.APPWRITE_CREATE_SELL),
  appWriteDatabase: String(import.meta.env.APPWRITE_DATABASE_ID),
  appWritePdfCollection: String(import.meta.env.APPWRITE_CREATE_PDF_COLLECTION),
  appWriteBuyHistory: String(import.meta.env.APPWRITE_CREATE_BUY_HISTORY),

  //   STORAGE IDS

  appWriteProductImgStorage: String(import.meta.env.APPWRITE_PROCUCT_IMAGES),
  appWriteCreatePdf: String(import.meta.env.APPWRITE_CREATE_PDF),
};

export default conf;
