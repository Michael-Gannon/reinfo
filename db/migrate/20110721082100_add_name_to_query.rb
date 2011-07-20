class AddNameToQuery < ActiveRecord::Migration
  def self.up
    add_column :queries, :name, :string
  end

  def self.down
    remove_column :queries, :name
  end
end