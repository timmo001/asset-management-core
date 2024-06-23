// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `asset-management-core_${name}`,
);

export const images = createTable(
  "image",
  {
    id: serial("id").primaryKey(),
    identifier: varchar("identifier", { length: 256 }).notNull(),
    url: varchar("url", {}).notNull(),
    description: varchar("description", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    updatedBy: varchar("updated_by", { length: 256 }),
  },
  (example) => ({
    identifierIndex: index("image_identifier_idx").on(example.identifier),
    urlIndex: index("image_url_idx").on(example.url),
  }),
);

export type SelectImage = InferSelectModel<typeof images>;
export type SelectImages = Array<SelectImage>;
export type InsertImage = InferInsertModel<typeof images>;
export type InsertImages = Array<InsertImage>;

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    subtitle: varchar("subtitle", { length: 256 }),
    content: varchar("content", {}),
    imageId: integer("image_id"),
    createdBy: varchar("created_by", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    updatedBy: varchar("updated_by", { length: 256 }),
  },
  (example) => ({
    titleIndex: index("post_title_idx").on(example.title),
  }),
);

export type SelectPost = InferSelectModel<typeof posts>;
export type SelectPosts = Array<SelectPost>;
export type InsertPost = InferInsertModel<typeof posts>;
export type InsertPosts = Array<InsertPost>;

export const assets = createTable(
  "asset",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("description", {}),
    imageIds: integer("image_ids")
      .array()
      .notNull()
      .default(sql`ARRAY[]::integer[]`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    updatedBy: varchar("updated_by", { length: 256 }),
  },
  (example) => ({
    nameIndex: index("asset_name_idx").on(example.name),
  }),
);

export type SelectAsset = InferSelectModel<typeof assets>;
export type SelectAssets = Array<SelectAsset>;
export type InsertAsset = InferInsertModel<typeof assets>;
export type InsertAssets = Array<InsertAsset>;

export const imagesRelations = relations(images, ({ one, many }) => ({
  posts: one(posts, {
    fields: [images.id],
    references: [posts.imageId],
    relationName: "postImage",
  }),
  assets: many(assets, {
    relationName: "assetImages",
  }),
}));
