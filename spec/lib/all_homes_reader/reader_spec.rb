require 'spec_helper'

describe AllHomesReader::Reader do
  describe 'reading suburbs' do
    before do
      FakeWeb.register_uri(:get, "http://example.com/test1", :string => "Hello World!")
    end
  end

  describe 'reading properties' do

  end
end