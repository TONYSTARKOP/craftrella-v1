import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('2943f9c5-8aff-405e-b134-12feb42bd840', '1Sid40@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv67890fghij', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1a095d3c-12ac-43ad-9ae0-049fff979e45', '9Armand.Reichel@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv12345abcde', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('606beb84-0ae8-4765-8667-fa678717cae5', '25Beth.Frami@gmail.com', 'Alex Taylor', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv67890fghij', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('d2f19a75-b05e-43d0-88e8-8ba1748b8f90', '33Bridgette75@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv11223klmno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('d66b26ad-24e1-4d6f-ab4a-b209e5871057', '41Jerry.Ruecker@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv11223klmno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('aa955b60-ac20-4881-b5d9-86d954182ce0', '49Armani.Vandervort42@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv12345abcde', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a3c1262b-5ea8-4799-8268-2c33be040b96', '57Remington_Johns5@gmail.com', 'Alex Taylor', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv09876jihgf', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('4e5f63de-532e-411e-8af5-e690adff9b2b', '65Naomi.Daniel@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv67890fghij', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1355f3b0-5d37-44b1-b097-207915ad5cb9', '73Godfrey_Heaney19@hotmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv11223klmno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('70da5de4-f23d-49ed-bdf1-aa006d94e62a', 'ChicThreads Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('2dcd2b00-4fc8-40a1-9f6e-645e5917c007', 'TrendSetters Group', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('9565076a-bfc1-4d19-be08-2b823d5cf666', 'GlamourGrove LLC', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('6f91a673-f3a7-4404-afd0-cc2701619db4', 'FashionFusion Inc.', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('e940b7aa-3e6c-4013-aafb-26fe173ab393', 'ChicThreads Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('8268ca13-0b81-4c54-8ef2-ec65482fd488', 'StyleSavvy Co.', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('cfd3e4f9-b950-420e-a90c-db51cccf197a', 'GlamourGrove LLC', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('e497fd8f-df2b-4651-8be8-1c852d2c10ca', 'ChicThreads Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('e799a5d4-01fc-4e8a-acaa-ebe6b1756aa5', 'ChicThreads Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('eb99fcca-40b9-4b7d-b02e-17866409009b', 'StyleSavvy Co.', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('df20aceb-6001-4c17-a774-246d31a2aa01', 'Tailor', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90', 'e497fd8f-df2b-4651-8be8-1c852d2c10ca');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('afb09e78-0c3e-434e-81fb-59a8d4c57c7c', 'Designer', '2943f9c5-8aff-405e-b134-12feb42bd840', 'e940b7aa-3e6c-4013-aafb-26fe173ab393');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('1e04f16c-fe1d-4a2c-9740-170ebb7f8761', 'Seller', '606beb84-0ae8-4765-8667-fa678717cae5', 'e497fd8f-df2b-4651-8be8-1c852d2c10ca');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('163f990f-089b-4a8f-bd11-22df3c5cd146', 'Admin', '1a095d3c-12ac-43ad-9ae0-049fff979e45', '70da5de4-f23d-49ed-bdf1-aa006d94e62a');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('a76b77e6-c6e5-4443-bad8-f7e8bebf55cd', 'Customer', '606beb84-0ae8-4765-8667-fa678717cae5', '70da5de4-f23d-49ed-bdf1-aa006d94e62a');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('02cfbe80-c16d-4c52-b941-b12aabcc4673', 'Customer', '4e5f63de-532e-411e-8af5-e690adff9b2b', 'cfd3e4f9-b950-420e-a90c-db51cccf197a');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('f0174b49-18e2-409a-ab19-66d2f521d651', 'Seller', 'd66b26ad-24e1-4d6f-ab4a-b209e5871057', 'cfd3e4f9-b950-420e-a90c-db51cccf197a');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('853080f3-74e7-4f4b-ba7b-02b2b7de565d', 'Customer', '1355f3b0-5d37-44b1-b097-207915ad5cb9', 'e940b7aa-3e6c-4013-aafb-26fe173ab393');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('abdc353a-a409-4dd7-b668-c54a91e21fc8', 'Seller', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '6f91a673-f3a7-4404-afd0-cc2701619db4');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('bf02bfc0-b20f-4c2a-a64f-c45e8901c2ac', 'Admin', '4e5f63de-532e-411e-8af5-e690adff9b2b', 'e799a5d4-01fc-4e8a-acaa-ebe6b1756aa5');

INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('29a6bb77-284a-4bb2-99dd-b0f739bb3f52', 'New collection launch notification', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('2392f678-e4bb-4b68-a62b-8a676b545102', 'New collection launch notification', '2943f9c5-8aff-405e-b134-12feb42bd840');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('ca2a8d1f-9b65-41da-81a1-b14c10d87c2e', 'New collection launch notification', '4e5f63de-532e-411e-8af5-e690adff9b2b');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('e77d494d-0a74-4f9d-8a8f-33c4a76c65bf', 'Reminder Your custom order is ready for pickup', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('de746135-d2b0-4c51-a075-d603a8f4c273', 'Reminder Your custom order is ready for pickup', '2943f9c5-8aff-405e-b134-12feb42bd840');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('04b8ac12-5757-41ed-82a6-508ca800f597', 'New collection launch notification', 'a3c1262b-5ea8-4799-8268-2c33be040b96');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('013d8c36-0a7c-4a94-b91d-29e7c820dd2c', 'Update Your favorite designer has added new items', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('491ec95f-4d2e-4a77-85e4-1f6c50da94b4', 'Reminder Your custom order is ready for pickup', '4e5f63de-532e-411e-8af5-e690adff9b2b');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('470c2c15-c6c5-461c-9fb9-265ed9f6384c', 'Exclusive discount offer for premium members', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('06424ee1-a789-49e7-aaa6-dc28f14e02f8', 'Reminder Your custom order is ready for pickup', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');

INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('2accb8bc-a7eb-4389-8a7b-b552ccf43c84', 'Bohemian Maxi Skirt', 'Flowy maxi skirt with a bohemian touch.', '60.00', 'S', 'Casual', 'Discontinued', 723, 'https://i.imgur.com/YfJQV5z.png?id=158', '9565076a-bfc1-4d19-be08-2b823d5cf666', 'd66b26ad-24e1-4d6f-ab4a-b209e5871057');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('670c74c3-a018-438c-949f-5ad246430e83', 'Classic White Shirt', 'Authentic leather jacket with a vintage feel.', '60.00', 'S', 'Outerwear', 'Out of Stock', 437, 'https://i.imgur.com/YfJQV5z.png?id=167', '6f91a673-f3a7-4404-afd0-cc2701619db4', '1355f3b0-5d37-44b1-b097-207915ad5cb9');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('d7e20d70-2935-440f-bebd-ed74d27721f8', 'Bohemian Maxi Skirt', 'Light and breezy dress ideal for summer outings.', '45.50', 'XXL', 'Casual', 'Available', 748, 'https://i.imgur.com/YfJQV5z.png?id=176', 'eb99fcca-40b9-4b7d-b02e-17866409009b', '1355f3b0-5d37-44b1-b097-207915ad5cb9');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('9b6ddcf2-67a0-450d-866a-e0ab7c14c15a', 'Bohemian Maxi Skirt', 'Timeless white shirt suitable for any occasion.', '30.00', 'XL', 'Casual', 'Available', 325, 'https://i.imgur.com/YfJQV5z.png?id=185', '6f91a673-f3a7-4404-afd0-cc2701619db4', '606beb84-0ae8-4765-8667-fa678717cae5');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('3480fe56-9edf-4664-b7ae-ba8d37f4bf29', 'Classic White Shirt', 'A stunning gown perfect for formal events.', '60.00', 'XL', 'Outerwear', 'Discontinued', 202, 'https://i.imgur.com/YfJQV5z.png?id=194', '2dcd2b00-4fc8-40a1-9f6e-645e5917c007', 'aa955b60-ac20-4881-b5d9-86d954182ce0');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('e60ec272-83ee-4b3c-917d-6eb7d7a7dd71', 'Vintage Leather Jacket', 'Flowy maxi skirt with a bohemian touch.', '45.50', 'L', 'Basics', 'Limited Edition', 724, 'https://i.imgur.com/YfJQV5z.png?id=203', '6f91a673-f3a7-4404-afd0-cc2701619db4', '1a095d3c-12ac-43ad-9ae0-049fff979e45');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('26a1fd92-326f-416f-a9e4-3486f98f6ec1', 'Casual Summer Dress', 'A stunning gown perfect for formal events.', '30.00', 'XL', 'Basics', 'Discontinued', 160, 'https://i.imgur.com/YfJQV5z.png?id=212', 'cfd3e4f9-b950-420e-a90c-db51cccf197a', '2943f9c5-8aff-405e-b134-12feb42bd840');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('2c960c42-0432-4b41-a3e0-be876177852f', 'Vintage Leather Jacket', 'A stunning gown perfect for formal events.', '120.00', 'S', 'Outerwear', 'Preorder', 795, 'https://i.imgur.com/YfJQV5z.png?id=221', 'cfd3e4f9-b950-420e-a90c-db51cccf197a', 'aa955b60-ac20-4881-b5d9-86d954182ce0');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('c3b7aa54-843c-470b-bb46-4ddf5258818e', 'Bohemian Maxi Skirt', 'Flowy maxi skirt with a bohemian touch.', '60.00', 'M', 'Basics', 'Available', 224, 'https://i.imgur.com/YfJQV5z.png?id=230', '2dcd2b00-4fc8-40a1-9f6e-645e5917c007', 'd66b26ad-24e1-4d6f-ab4a-b209e5871057');
INSERT INTO "Product" ("id", "name", "description", "price", "size", "category", "status", "quantity", "pictureUrl", "organizationId", "userId") VALUES ('cdbc1dea-5d1f-40e8-a8b2-e2e4cf001b0b', 'Vintage Leather Jacket', 'Authentic leather jacket with a vintage feel.', '45.50', 'L', 'Formal', 'Discontinued', 69, 'https://i.imgur.com/YfJQV5z.png?id=239', '6f91a673-f3a7-4404-afd0-cc2701619db4', 'd66b26ad-24e1-4d6f-ab4a-b209e5871057');

INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('d5fc90e5-b60f-48fc-8987-aaf7b953d92a', 'Processing', '150.00', 'Purchase', 'eb99fcca-40b9-4b7d-b02e-17866409009b', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('1f3d2909-77b3-4ad7-984e-2d92c70bb7b5', 'Cancelled', '150.00', 'Tailoring', 'e940b7aa-3e6c-4013-aafb-26fe173ab393', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('29cf348c-585c-4973-b771-0ae7594931c4', 'Shipped', '200.25', 'Return', '9565076a-bfc1-4d19-be08-2b823d5cf666', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('74da091c-e745-47e0-b893-7da07eda3445', 'Pending', '200.25', 'Tailoring', '2dcd2b00-4fc8-40a1-9f6e-645e5917c007', '1a095d3c-12ac-43ad-9ae0-049fff979e45');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('24d628d3-df0c-4f00-b6cf-de104b929b3d', 'Pending', '75.50', 'Tailoring', '2dcd2b00-4fc8-40a1-9f6e-645e5917c007', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('da83beec-bdf8-406f-9b3c-e998ac509fa2', 'Cancelled', '75.50', 'Customization', 'e497fd8f-df2b-4651-8be8-1c852d2c10ca', '606beb84-0ae8-4765-8667-fa678717cae5');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('206bba95-d9ab-4481-8584-3c83116934e1', 'Cancelled', '75.50', 'Tailoring', 'eb99fcca-40b9-4b7d-b02e-17866409009b', 'aa955b60-ac20-4881-b5d9-86d954182ce0');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('8f5105c7-603f-46dc-b984-6880ce6b2f41', 'Processing', '99.99', 'Purchase', 'cfd3e4f9-b950-420e-a90c-db51cccf197a', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('eff6633f-1cac-4e1e-b7d2-cfb19737c2c6', 'Pending', '200.25', 'Purchase', 'e799a5d4-01fc-4e8a-acaa-ebe6b1756aa5', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');
INSERT INTO "Order" ("id", "status", "total", "type", "organizationId", "userId") VALUES ('5a459489-12d9-43cb-874c-2aaa7eb3902d', 'Pending', '99.99', 'Tailoring', '2dcd2b00-4fc8-40a1-9f6e-645e5917c007', 'aa955b60-ac20-4881-b5d9-86d954182ce0');

INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('148fcb6e-8c21-4be2-8c80-a96460caa8c1', 853, '15.75', '5a459489-12d9-43cb-874c-2aaa7eb3902d', '3480fe56-9edf-4664-b7ae-ba8d37f4bf29');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('599d3c77-619e-4cf1-9e59-c1e36fc90264', 201, '99.00', 'd5fc90e5-b60f-48fc-8987-aaf7b953d92a', '670c74c3-a018-438c-949f-5ad246430e83');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('8f309b1b-3a2f-4cea-b69f-aa1760596137', 593, '15.75', '5a459489-12d9-43cb-874c-2aaa7eb3902d', '670c74c3-a018-438c-949f-5ad246430e83');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('78616680-c1e7-4e92-9c9c-af8c54b97f2b', 912, '25.00', '29cf348c-585c-4973-b771-0ae7594931c4', '9b6ddcf2-67a0-450d-866a-e0ab7c14c15a');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('8d246515-c291-4fc8-8e2b-842cb77173c7', 857, '49.50', '74da091c-e745-47e0-b893-7da07eda3445', '2accb8bc-a7eb-4389-8a7b-b552ccf43c84');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('ce0e1007-46cd-44ce-90d7-97b974eee705', 6, '99.00', '24d628d3-df0c-4f00-b6cf-de104b929b3d', 'e60ec272-83ee-4b3c-917d-6eb7d7a7dd71');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('2628cfc0-f493-44f2-a92c-88c3eba71148', 2, '25.00', 'eff6633f-1cac-4e1e-b7d2-cfb19737c2c6', '26a1fd92-326f-416f-a9e4-3486f98f6ec1');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('f78fe690-4d97-428e-9053-2180f2179c6b', 211, '29.99', '74da091c-e745-47e0-b893-7da07eda3445', '3480fe56-9edf-4664-b7ae-ba8d37f4bf29');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('fb77578c-3efe-4224-a4c3-d8125c8afbce', 47, '49.50', '24d628d3-df0c-4f00-b6cf-de104b929b3d', 'e60ec272-83ee-4b3c-917d-6eb7d7a7dd71');
INSERT INTO "OrderItem" ("id", "quantity", "price", "orderId", "productId") VALUES ('0c6ed535-2615-452e-9f58-f432a040d239', 317, '25.00', '5a459489-12d9-43cb-874c-2aaa7eb3902d', 'cdbc1dea-5d1f-40e8-a8b2-e2e4cf001b0b');

INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('a9c6f7cc-664b-446b-8c59-17d4d4a95edd', 'Elegant evening gown with intricate lace details', '2025-06-23T08:10:58.222Z', 'Completed', 'e799a5d4-01fc-4e8a-acaa-ebe6b1756aa5', 'a3c1262b-5ea8-4799-8268-2c33be040b96');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('fb4eb5de-8704-4708-9ce4-7393445568e4', 'Elegant evening gown with intricate lace details', '2024-11-11T13:52:34.767Z', 'Completed', 'e940b7aa-3e6c-4013-aafb-26fe173ab393', 'd66b26ad-24e1-4d6f-ab4a-b209e5871057');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('60d9f550-97ff-4b79-80de-b7794545a034', 'Customfit business suit with personalized monogram', '2025-12-25T10:39:13.131Z', 'Pending', '70da5de4-f23d-49ed-bdf1-aa006d94e62a', 'aa955b60-ac20-4881-b5d9-86d954182ce0');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('d6d51b9a-2268-49d2-be87-e3e938fcb892', 'Traditional ethnic wear with modern twist', '2025-04-11T20:27:32.950Z', 'Pending', '70da5de4-f23d-49ed-bdf1-aa006d94e62a', '606beb84-0ae8-4765-8667-fa678717cae5');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('9330be75-f722-4aa3-9146-e3cb508d7902', 'Traditional ethnic wear with modern twist', '2024-03-10T22:25:37.303Z', 'Awaiting Payment', 'e940b7aa-3e6c-4013-aafb-26fe173ab393', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('fc83f3ce-e72b-4c60-9ade-ff5828e80357', 'Elegant evening gown with intricate lace details', '2024-09-23T11:49:20.725Z', 'Pending', 'e497fd8f-df2b-4651-8be8-1c852d2c10ca', '2943f9c5-8aff-405e-b134-12feb42bd840');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('32a949dd-cafd-44b9-81ec-929829a1bd7a', 'Vintageinspired cocktail dress with sequins', '2025-05-12T00:29:49.500Z', 'Pending', '2dcd2b00-4fc8-40a1-9f6e-645e5917c007', '4e5f63de-532e-411e-8af5-e690adff9b2b');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('3b49d391-8a49-47ac-b3ee-3770f1728f5a', 'Casual summer dress with floral patterns', '2024-06-06T02:24:27.776Z', 'Pending', '6f91a673-f3a7-4404-afd0-cc2701619db4', '1355f3b0-5d37-44b1-b097-207915ad5cb9');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('02f3ec45-5d71-4b26-a0cb-1dbbabbab596', 'Casual summer dress with floral patterns', '2025-09-30T01:37:38.006Z', 'Pending', '70da5de4-f23d-49ed-bdf1-aa006d94e62a', 'aa955b60-ac20-4881-b5d9-86d954182ce0');
INSERT INTO "CustomOrder" ("id", "description", "deadline", "status", "organizationId", "userId") VALUES ('5d435838-2685-406f-9b61-62aa5ab4f552', 'Traditional ethnic wear with modern twist', '2025-08-11T19:03:40.193Z', 'Completed', '8268ca13-0b81-4c54-8ef2-ec65482fd488', '606beb84-0ae8-4765-8667-fa678717cae5');

INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('b410ee7c-fee6-48ca-9084-c4db1ceed2aa', '150', '2025-11-11T18:07:16.459Z', 'In Review', '32a949dd-cafd-44b9-81ec-929829a1bd7a', 'd66b26ad-24e1-4d6f-ab4a-b209e5871057');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('5ac64fd4-4579-482d-b7c1-8de8a6bc4a16', '300', '2024-09-26T17:18:38.674Z', 'Accepted', '9330be75-f722-4aa3-9146-e3cb508d7902', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('c9ab9761-1aa5-478e-adcb-d5ad38c7e24e', '200', '2025-01-10T02:17:30.236Z', 'In Review', 'a9c6f7cc-664b-446b-8c59-17d4d4a95edd', '606beb84-0ae8-4765-8667-fa678717cae5');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('71c352c5-ffeb-40ef-9d17-20dcb1df2de9', '350', '2025-06-23T14:58:52.901Z', 'Pending', '9330be75-f722-4aa3-9146-e3cb508d7902', '4e5f63de-532e-411e-8af5-e690adff9b2b');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('87dd6eb5-3af0-4425-987b-80180a646d5d', '300', '2025-04-08T07:00:45.499Z', 'In Review', '9330be75-f722-4aa3-9146-e3cb508d7902', 'aa955b60-ac20-4881-b5d9-86d954182ce0');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('757af01d-3679-4dd3-9623-4c6dc72d7a9b', '300', '2024-06-21T17:09:36.499Z', 'Completed', 'fc83f3ce-e72b-4c60-9ade-ff5828e80357', '2943f9c5-8aff-405e-b134-12feb42bd840');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('187d5088-cd39-40e1-ae10-75f8bfa49bfc', '200', '2025-12-05T05:44:39.604Z', 'Accepted', '3b49d391-8a49-47ac-b3ee-3770f1728f5a', 'a3c1262b-5ea8-4799-8268-2c33be040b96');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('ee43ee8e-b935-4dbc-983a-a09604c180a6', '250', '2025-07-27T23:03:59.425Z', 'Pending', '9330be75-f722-4aa3-9146-e3cb508d7902', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('cf4192d0-1ca0-437d-8aa0-2af6ce28c5a7', '200', '2025-12-10T13:07:03.952Z', 'Rejected', 'd6d51b9a-2268-49d2-be87-e3e938fcb892', 'aa955b60-ac20-4881-b5d9-86d954182ce0');
INSERT INTO "Bid" ("id", "price", "timeline", "status", "customOrderId", "userId") VALUES ('c4ec0bb8-ab7f-4772-ba45-b4cad54de407', '200', '2025-05-25T19:35:33.087Z', 'In Review', 'a9c6f7cc-664b-446b-8c59-17d4d4a95edd', 'aa955b60-ac20-4881-b5d9-86d954182ce0');

INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('5c779b68-c71a-4f49-84cd-8ef041f77ba7', 'Vintage denim jackets', '2025-01-23T13:42:50.999Z', 'Delivered', 57, '6f91a673-f3a7-4404-afd0-cc2701619db4', '606beb84-0ae8-4765-8667-fa678717cae5');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('7d2e24a6-e4d1-4421-b4ba-20c2bca1875d', 'Set of summer dresses', '2024-06-17T21:59:02.350Z', 'Processing', 490, '9565076a-bfc1-4d19-be08-2b823d5cf666', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('279ea622-3867-4c2e-b912-4689705318fb', 'Formal wear collection', '2025-05-31T05:14:12.436Z', 'Processing', 649, 'eb99fcca-40b9-4b7d-b02e-17866409009b', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('6536bcfc-81bd-4e30-b4a5-c97e802226bd', 'Vintage denim jackets', '2024-11-04T00:45:26.668Z', 'Pending Pickup', 598, 'e497fd8f-df2b-4651-8be8-1c852d2c10ca', 'd66b26ad-24e1-4d6f-ab4a-b209e5871057');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('6fae8bbf-71bf-43bd-8cf9-44d0383c1cb5', 'Formal wear collection', '2024-11-13T01:39:09.362Z', 'Processing', 707, '8268ca13-0b81-4c54-8ef2-ec65482fd488', 'd2f19a75-b05e-43d0-88e8-8ba1748b8f90');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('b194be29-5c35-4a43-8432-64b15ef43e6a', 'Set of summer dresses', '2025-05-13T23:06:15.766Z', 'Awaiting Confirmation', 151, 'e799a5d4-01fc-4e8a-acaa-ebe6b1756aa5', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('b0683560-6df3-42bc-8f0c-dd9389ef1660', 'Formal wear collection', '2025-12-24T03:19:45.133Z', 'Pending Pickup', 85, '6f91a673-f3a7-4404-afd0-cc2701619db4', '1355f3b0-5d37-44b1-b097-207915ad5cb9');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('46c94c79-f538-437c-923e-ce8c625fafd7', 'Gently used winter coat', '2025-04-03T05:08:34.502Z', 'Pending Pickup', 565, '6f91a673-f3a7-4404-afd0-cc2701619db4', '1355f3b0-5d37-44b1-b097-207915ad5cb9');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('b38f496c-aaf7-4743-baa4-b5f36fbe69ef', 'Assorted childrens clothing', '2024-04-20T20:51:40.071Z', 'Processing', 364, '9565076a-bfc1-4d19-be08-2b823d5cf666', '2943f9c5-8aff-405e-b134-12feb42bd840');
INSERT INTO "Donation" ("id", "description", "pickupTime", "status", "kindnessPoints", "organizationId", "userId") VALUES ('716895ba-953f-4b87-bf1e-2ec1e863b17c', 'Assorted childrens clothing', '2026-01-02T09:03:03.995Z', 'In Transit', 859, '6f91a673-f3a7-4404-afd0-cc2701619db4', '606beb84-0ae8-4765-8667-fa678717cae5');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
