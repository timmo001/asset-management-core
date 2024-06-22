// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
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

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    subtitle: varchar("subtitle", { length: 256 }),
    content: varchar("content", {}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
  }),
);

export const assets = createTable(
  "asset",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("description", {}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const assetImages = createTable(
  "asset_image",
  {
    id: serial("id").primaryKey(),
    assetId: serial("asset_id")
      .references(() => assets.id)
      .notNull(),
    url: varchar("url", {}).notNull(),
    description: varchar("description", { length: 256 }),
  },
  (example) => ({
    assetIdIndex: index("asset_id_idx").on(example.assetId),
    urlIndex: index("url_idx").on(example.url),
  }),
);

export const assetsRelations = relations(assets, ({ many }) => ({
  images: many(assetImages),
}));

export const assetImagesRelations = relations(assetImages, ({ one }) => ({
  asset: one(assets, {
    fields: [assetImages.assetId],
    references: [assets.id],
  }),
}));
