# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_04_090320) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_admins_on_user_id"
  end

  create_table "histories", force: :cascade do |t|
    t.string "transaction_name"
    t.string "stock_name"
    t.string "symbol"
    t.integer "quantity"
    t.integer "price"
    t.bigint "trader_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["trader_id"], name: "index_histories_on_trader_id"
  end

  create_table "markets", force: :cascade do |t|
    t.string "symbol"
    t.string "exchange"
    t.string "exchangeSuffix"
    t.string "exchangeName"
    t.string "exchangeSegment"
    t.string "name"
    t.string "date"
    t.string "type_weight"
    t.string "iexId"
    t.string "region"
    t.string "currency"
    t.string "isEnabled"
    t.string "figi"
    t.string "cik"
    t.string "lei"
    t.string "exchangeSegmentName"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "search"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "name"
    t.float "latest_price"
    t.float "change_percent"
    t.string "symbol"
    t.string "company_logo"
    t.float "quantity"
    t.float "amount_bought"
    t.float "amount_sold"
    t.bigint "trader_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["trader_id"], name: "index_stocks_on_trader_id"
  end

  create_table "traders", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "status"
    t.integer "total_cash"
    t.float "equity"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_traders_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "generate_confirmation_token"
    t.string "confirmation_url"
    t.string "role"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "admins", "users"
  add_foreign_key "histories", "traders"
  add_foreign_key "traders", "users"
end
