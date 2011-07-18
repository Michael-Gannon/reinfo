class CreateProperty < ActiveRecord::Migration
  def self.up
    create_table :properties do | t |
      t.string :address, :null => false
      t.integer :suburb_id, :null => false
      t.integer :price, :null => false
      t.integer :bedrooms
      t.integer :bathrooms
      t.boolean :ensuite
      t.string :property_type
    end
  end

  def self.down
    drop_table :properties
  end
end