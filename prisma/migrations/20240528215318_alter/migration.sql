/*
  Warnings:

  - The primary key for the `ProductType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CouponProductType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Coupon` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProductType" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ProductType";
DROP TABLE "ProductType";
ALTER TABLE "new_ProductType" RENAME TO "ProductType";
CREATE UNIQUE INDEX "ProductType_name_key" ON "ProductType"("name");
CREATE TABLE "new_CouponProductType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "couponId" TEXT NOT NULL,
    "productTypeId" TEXT NOT NULL,
    CONSTRAINT "CouponProductType_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CouponProductType_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CouponProductType" ("couponId", "id", "productTypeId") SELECT "couponId", "id", "productTypeId" FROM "CouponProductType";
DROP TABLE "CouponProductType";
ALTER TABLE "new_CouponProductType" RENAME TO "CouponProductType";
CREATE UNIQUE INDEX "CouponProductType_couponId_productTypeId_key" ON "CouponProductType"("couponId", "productTypeId");
CREATE UNIQUE INDEX "CouponProductType_productTypeId_key" ON "CouponProductType"("productTypeId");
CREATE TABLE "new_Coupon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "baseDiscount" REAL NOT NULL,
    "additionalDiscount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Coupon" ("additionalDiscount", "baseDiscount", "code", "createdAt", "id", "updatedAt") SELECT "additionalDiscount", "baseDiscount", "code", "createdAt", "id", "updatedAt" FROM "Coupon";
DROP TABLE "Coupon";
ALTER TABLE "new_Coupon" RENAME TO "Coupon";
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
PRAGMA foreign_key_check("ProductType");
PRAGMA foreign_key_check("CouponProductType");
PRAGMA foreign_key_check("Coupon");
PRAGMA foreign_keys=ON;
