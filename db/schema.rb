# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110721082100) do

  create_table "properties", :force => true do |t|
    t.string   "address",       :null => false
    t.integer  "suburb_id",     :null => false
    t.integer  "price",         :null => false
    t.integer  "bedrooms"
    t.integer  "bathrooms"
    t.boolean  "ensuite"
    t.string   "property_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "queries", :force => true do |t|
    t.string   "query"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "suburbs", :force => true do |t|
    t.string "name", :null => false
    t.string "url",  :null => false
  end

end
