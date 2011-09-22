module Searchable
  def self.included(base)
    base.send :extend, ClassMethods
  end
 
  module ClassMethods
    def is_searchable(options = {})
      cattr_accessor :searchable_fields
      self.searchable_fields = (options[:only] || self.column_names.inject([]){|i,j|i<<j.to_sym;i})
    end
  end
end
 
ActiveRecord::Base.send :include, Searchable

module ActiveRecord
  def self.searchable_models
    #force load all the models
    Dir.glob(RAILS_ROOT + '/app/models/*.rb').each { |file| require file }
    found = []

    #test them for searchable_fields
    ObjectSpace.each_object(Class) do |klass|
      found << klass if klass.respond_to? :searchable_fields
    end
    found
  end
end