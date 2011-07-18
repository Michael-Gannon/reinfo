class CreateSuburbs < ActiveRecord::Migration
  def self.up
    create_table :suburbs do | t |
      t.string :name, :null => false
      t.string :url, :null => false
    end
  end

  def self.down
    drop_table :suburbs
  end
end