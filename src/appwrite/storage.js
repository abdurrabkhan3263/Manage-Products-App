import conf from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

class DatabaseService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  /**
   * The function `createCustomer` creates a new customer document in a database with provided details.
   * @returns The `createCustomer` function is returning the result of creating a new document in the
   * specified database collection with the provided customer details such as customer name, phone
   * number, address, total udhar, customer history, customer latest, and list of PDFs.
   */

  async createCustomer({
    customerName,
    phoneNumber,
    customerAddress,
    totalUdhar,
    customerHistory,
    customerLatest,
    listPdf,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        ID.unique(),
        {
          customerName,
          phoneNumber,
          customerAddress,
          totalUdhar,
          customerHistory,
          customerLatest,
          listPdf,
        },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Customer :: ", error);
    }
  }

  /**
   * This async function updates customer information in a database using the provided parameters.
   * @param slug - The `slug` parameter is typically a unique identifier or key that is used to locate a
   * specific document or record in a database. It helps to uniquely identify the customer whose
   * information needs to be updated.
   * @returns The `updateCustomer` method is returning the result of updating a document in the database
   * with the provided customer information such as customer name, phone number, address, total udhar,
   * customer history, latest information, and a list of PDFs. If the update is successful, it will
   * return the updated document. If there is an error during the update process, it will throw an error
   * message indicating the
   */

  async updateCustomer(
    slug,
    {
      customerName,
      phoneNumber,
      customerAddress,
      totalUdhar,
      customerHistory,
      customerLatest,
      listPdf,
    },
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        slug,
        {
          customerName,
          phoneNumber,
          customerAddress,
          totalUdhar,
          customerHistory,
          customerLatest,
          listPdf,
        },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: UpdateCustomer :: ", error);
    }
  }

  /**
   * The function `deleteCustomer` deletes a customer document from a specified database collection using
   * AppWrite.
   * @param userId - The `deleteCustomer` function is an asynchronous function that takes a `userId`
   * parameter. This function attempts to delete a document from a database using the `deleteDocument`
   * method. If an error occurs during the deletion process, it will be caught and rethrown with a custom
   * error message.
   * @returns The `deleteCustomer` method is returning the result of deleting a document with the
   * specified `userId` from the database collection `conf.appWriteCustomerDetailsCollId`.
   */

  async deleteCustomer(userId) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        userId,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: deleteCustomer :: ", error);
    }
  }

  /**
   * The function `gettingAllCustomer` retrieves all customer details from a specified database
   * collection using AppWrite.
   * @param [Query] - The `Query` parameter in the `gettingAllCustomer` function is an optional parameter
   * that represents the query criteria to filter the list of customer documents to be retrieved from the
   * database. If a `Query` object is provided when calling this function, it will be used as the filter
   * criteria for the database
   * @returns The `gettingAllCustomer` function is returning the result of listing documents from the
   * specified database and collection based on the provided query.
   */

  async gettingAllCustomer(Query = []) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteCustomerDetailsCollId,
        Query && Query,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: gettingAllCustomer :: ", error);
    }
  }

  /**
   * The function creates a customer buy history document in a database using AppWrite.
   * @returns The `createCustomerBuyHistory` function is returning the result of creating a document in
   * the specified database collection with the provided customer buy history details, including the
   * `customerId`, `customerDetails`, and `buyProduct`.
   */

  async createCustomerBuyHistory({ customerId, customerDetails, buyProduct }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteBuyHistory,
        ID.unique(),
        { customerId, customerDetails, buyProduct },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Customer Buy History :: ", error);
    }
  }

  /**
   * The function `deleteCustomerBuyHistory` deletes a customer's buy history from a database using
   * async/await syntax.
   * @param userId - The `userId` parameter is the unique identifier of the customer whose buy history
   * needs to be deleted.
   * @returns The `deleteCustomerBuyHistory` method is returning the result of deleting a document with
   * the specified `userId` from the database.
   */

  async deleteCustomerBuyHistory(customerId) {
    try {
      return await this.databases.deleteDocument(customerId);
    } catch (error) {
      throw ("AppWrite :: Error :: Delete Customer Buy History :: ", error);
    }
  }

  /**
   * The function `createGraphData` asynchronously creates a document in a database with product name,
   * price, and buy date information.
   * @returns The `createGraphData` function is returning the result of calling
   * `this.databases.createDocument` with the specified parameters `{ productNamePrice, buyDate }`.
   */

  async createGraphData({ userId, productNamePrice, buyDate }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.createGraphData,
        { userId, productNamePrice, buyDate },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: CreateGraph Data :: ", error);
    }
  }

  /**
   * The function `allGraphData` retrieves all graph data for a specific user from a database using
   * AppWrite.
   * @param userId - The `userId` parameter is used to specify the user for which you want to retrieve
   * graph data from the database.
   * @returns The `allGraphData` function is returning the result of listing documents from a database
   * based on the provided `userId`.
   */

  async allGraphData(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteGraphData,
        [Query.equal("userId", userId)],
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Getting All Graph Data :: ", error);
    }
  }

  async getProductList(Query = []) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        Query,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Getting ProductData :: ", error);
    }
  }

  /**
   * The function `createProductDetails` asynchronously creates product details in a database using the
   * provided parameters.
   */

  async createProductDetails({
    productName,
    productPrice,
    productImage,
    productPriceOption,
    productImageId,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        ID.unique(),
        {
          productName,
          productPrice,
          productImage,
          productPriceOption,
          productImageId,
          userId,
        },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Product Details :: ", error);
    }
  }

  /**
   * This async function updates product details in a database using AppWrite.
   * @param slug - The `slug` parameter is typically a unique identifier or a user-friendly version of
   * the product name that is used in the URL to identify a specific product. It is often used in
   * e-commerce websites or content management systems to create SEO-friendly URLs.
   * @returns The `updateProductDetails` function is returning the result of updating the product details
   * in the database using the `updateDocument` method.
   */

  async updateProductDetails(
    slug,
    {
      productName,
      productPrice,
      productImage,
      productPriceOption,
      productImageId,
      userId,
    },
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        slug,
        {
          productName,
          productPrice,
          productImage,
          productPriceOption,
          productImageId,
          userId,
        },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Update Product Details :: ", error);
    }
  }

  /**
   * The `deleteProduct` function asynchronously deletes a document from a specified database collection
   * based on the provided slug.
   * @param slug - The `slug` parameter in the `deleteProduct` function is typically a unique identifier
   * for the product that you want to delete from the database. It is used to locate and delete the
   * specific product document from the database collection.
   * @returns The `deleteProduct` method is returning the result of deleting a document with the
   * specified `slug` from the database collection.
   */

  async deleteProduct(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        slug,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Delete Product List :: ", error);
    }
  }

  async getProductById(id) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabase,
        conf.appWriteProductsListCollId,
        id,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Get Product Id :: ", error);
    }
  }

  /**
   * The function `createSell` asynchronously creates a sell document in a database with customer
   * details, product list, and buy date.
   * @returns The `createSell` method is returning the result of the `createDocument` function call from
   * the `databases` object with the parameters `conf.appWriteDatabase`, `conf.appWriteCreateSell`, and
   * an object containing `customerDetails`, `buyDate`, and `productList`.
   */

  async createSell({ customerDetails, productList, buyDate }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        ID.unique(),
        { customerDetails, buyDate, productList },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Sell :: ", error);
    }
  }

  /**
   * The function `updateSell` updates a document in a database with customer details, product list, and
   * buy date.
   * @param slug - The `slug` parameter is typically a unique identifier or key that is used to locate
   * and update a specific document or record in a database. It helps to identify the specific item that
   * needs to be updated.
   * @returns The `updateSell` function is returning the result of updating a document in the specified
   * database with the provided `customerDetails`, `productList`, and `buyDate` for the given `slug`.
   */

  async updateSell(slug, { customerDetails, productList, buyDate }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        slug,
        { customerDetails, productList, buyDate },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: UpdateSell :: ", error);
    }
  }

  /**
   * The function `deleteSell` asynchronously deletes a document from a specified database using AppWrite
   * and throws an error if encountered.
   * @param docId - The `docId` parameter in the `deleteSell` function is the unique identifier of the
   * document that you want to delete from the specified database collection. It is used to identify the
   * specific document that needs to be removed from the collection.
   * @returns The `deleteSell` function is returning the result of deleting a document with the specified
   * `docId` from the database using the `this.databases.deleteDocument` method.
   */

  async deleteSell(docId) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabase,
        conf.appWriteCreateSell,
        docId,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: DeleteSell :: ", error);
    }
  }

  /**
   * The function `createPdf` asynchronously creates a new document in a specified database collection
   * with the provided userId, pdfFileId, and createDate.
   * @returns The `createPdf` function is returning the result of creating a document in the specified
   * database collection with the provided `userId`, `pdfFileId`, and `createDate` values.
   */

  async createPdf(userId, pdfFileId, createDate) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabase,
        conf.appWritePdfCollection,
        pdfFileId,
        { userId, createDate },
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Create Pdf :: ", error);
    }
  }

  /**
   * The function `deletePdf` is an asynchronous function that deletes a PDF document using the
   * `deleteDocument` method from a database, handling any errors that may occur.
   * @param slug - The `slug` parameter in the `deletePdf` function is typically a unique identifier or
   * key that is used to locate and delete a specific PDF document from the database. It helps to
   * uniquely identify the document that needs to be deleted.
   * @returns The `deletePdf` function is returning the result of the `deleteDocument` method from the
   * `databases` object after awaiting its completion.
   */

  async deletePdf(slug) {
    try {
      return await this.databases.deleteDocument(slug);
    } catch (error) {
      throw ("AppWrite :: Error :: DeletePdf :: ", error);
    }
  }

  // STORAGE CODE:-

  /**
   * The function `addProductImg` asynchronously adds an image file to a specified bucket for a given
   * product ID.
   * @param file - The `file` parameter in the `addProductImg` function is the image file that you want
   * to upload to a storage bucket.
   * @param productId - The `productId` parameter is the unique identifier of the product to which the
   * image file will be associated.
   * @returns The `addProductImg` function is returning the result of creating a file in the bucket with
   * the specified product ID and file.
   */

  async addProductImg(File) {
    try {
      return await this.bucket.createFile(
        conf.appWriteProductImgStorage,
        ID.unique(),
        File,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Add Product Img :: ", error);
    }
  }

  /**
   * The function `updateProductImg` asynchronously updates a product image file for a given product ID
   * using the AppWrite storage bucket.
   * @param file - The `file` parameter in the `updateProductImg` function likely represents the image
   * file that you want to update for a specific product. This file contains the new image data that you
   * want to store or update in your storage system.
   * @param productId - The `productId` parameter is the unique identifier of the product for which you
   * want to update the image.
   * @returns The `updateProductImg` function is returning the result of the `this.bucket.updateFile`
   * method call, which is likely the result of updating the product image in the specified storage
   * location.
   */

  async updateProductImg(file, productId) {
    try {
      return await this.bucket.updateFile(
        conf.appWriteProductImgStorage,
        productId,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Update Product Image :: ", error);
    }
  }

  /**
   * The function `getProductImgForPreview` retrieves a product image for preview using a file ID.
   * @param fileId - The `fileId` parameter is the unique identifier or key associated with a specific
   * file in the system. It is used to retrieve the file for preview purposes in the
   * `getProductImgForPreview` function.
   * @returns The `getProductImgForPreview` function is returning the result of calling
   * `this.bucket.getFilePreview(conf.appWriteProductImgStorage, fileId)`.
   */

  getProductImgForPreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appWriteProductImgStorage, fileId);
    } catch (error) {
      throw "AppWrite :: Error :: Get Product Image For Preview";
    }
  }

  /**
   * The function `deleteProductImg` asynchronously deletes a file associated with a product using the
   * `bucket` service and throws an error if there is any.
   * @param file - The `file` parameter in the `deleteProductImg` function is not being used in the
   * function body. It seems like it was included as a parameter but not utilized within the function. If
   * you intended to use the `file` parameter for deleting the product image, you may need to update the
   * @param productId - The `productId` parameter is the unique identifier of the product whose image you
   * want to delete.
   * @returns The `deleteProductImg` function is returning the result of
   * `this.bucket.deleteFile(productId)` after awaiting its completion.
   */

  async deleteProductImg(productId) {
    if (!productId) return;
    try {
      return await this.bucket.deleteFile(
        conf.appWriteProductImgStorage,
        productId,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Delete Product Image :: ", error);
    }
  }

  /**
   * The `addPdf` function asynchronously adds a PDF file to a bucket and returns the result.
   * @param file - The `file` parameter in the `addPdf` function represents the PDF file that you want to
   * add to a bucket. This function uses the `bucket.createFile` method to upload the PDF file to a
   * specified location in the bucket.
   * @returns The `addPdf` function is returning the result of creating a file in the bucket using the
   * `createFile` method with the specified configuration and unique ID.
   */

  async addPdf(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteCreatePdf,
        ID.unique(),
        file,
      );
    } catch (error) {
      throw ("AppWrite :: Error :: Add Product Img :: ", error);
    }
  }

  /**
   * The function `deletePdfImg` asynchronously deletes a file with the specified `fileId` from a bucket
   * and throws an error if there is any.
   * @param fileId - The `fileId` parameter in the `deletePdfImg` function is used to specify the unique
   * identifier of the PDF image file that you want to delete from the bucket.
   * @returns The `deletePdfImg` function is returning the result of `this.bucket.deleteFile(fileId)`
   * after awaiting its completion.
   */

  async deletePdfImg(fileId) {
    try {
      return await this.bucket.deleteFile(fileId);
    } catch (error) {
      throw ("AppWrite :: Error :: Delete Pdf Img :: ", error);
    }
  }

  /**
   * The function `getPdfForPreview` retrieves a PDF file for preview using the `fileId` parameter.
   * @param fileId - The `fileId` parameter is used to identify the specific file for which you want to
   * generate a PDF preview. It is typically a unique identifier assigned to the file within the system
   * or storage where the file is located.
   * @returns The `getFilePreview` method is being called with the parameters `conf.appWriteCreatePdf`
   * and `fileId`, and the result of this method call is being returned.
   */
  getPdfForPreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appWriteCreatePdf, fileId);
    } catch (error) {
      throw "AppWrite :: Error :: Get Product Image For Preview";
    }
  }

  /**
   * The function `getPdfForDownload` retrieves a PDF file for download using the specified fileId.
   * @param fileId - The `fileId` parameter in the `getPdfForDownload` function is used to specify the
   * unique identifier of the file for which the PDF download is requested.
   * @returns The `getPdfForDownload` function is returning the result of calling
   * `this.bucket.getFileDownload(conf.appWriteCreatePdf, fileId)`.
   */
  getPdfForDownload(fileId) {
    try {
      return this.bucket.getFileDownload(conf.appWriteCreatePdf, fileId);
    } catch (error) {
      throw ("AppWrite :: Error :: Get Pdf For Download :: ", error);
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
