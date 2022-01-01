require 'rails_helper'

describe User, type: :model do
    context 'Create User with invalid parameters' do
        it 'is not valid with name character length less than 5 characters' do
            user = User.new
            user.name = "abcd"

            expect(user).to_not be_valid
            expect(user.errors).to be_present
        end

        it 'is not valid with duplicate email registration' do
            user = User.new
            user.email = "test2@test.com"
            user.name = "test01"
            user.password = "password1"

            user2 = User.new
            user.email = "test2@test.com"
            user.name = "test02"
            user.password = "password2"

            expect(user2).to_not be_valid
            expect(user2.errors).to be_present
        end

        it 'is not valid with wrong email format' do
            user = User.new
            user.email = "test.com"

            expect(user).to_not be_valid
            expect(user.errors).to be_present
        end
        
        it 'is not allowed without an email' do
            user = User.new
            user.name = "samplename"
            user.email = nil
            user.password = "password123"

            expect(user).to_not be_valid
            expect(user.errors).to be_present
        end

        it 'is not allowed without a name' do
            user = User.new
            user.name = nil
            user.email = "test@email.com"
            user.password = "password123"

            expect(user).to_not be_valid
            expect(user.errors).to be_present
        end 

        it 'is not allowed without a password' do
            user = User.new
            user.name = "samplename"
            user.email = "test@email.com"
            user.password = nil

            expect(user).to_not be_valid
            expect(user.errors).to be_present            
        end

        it 'is not valid if password is less than six (6) characters' do
            user = User.new
            user.name = "samplename"
            user.email = "test@email.com"
            user.password = "pass"

            expect(user).to_not be_valid
            expect(user.errors).to be_present  
        end
    end

    context 'Create user with valid parameters' do
        it 'is valid with name character length is more than 5 characters' do
            user = User.new
            user.name = "samplename"
            user.email = "test@email.com"
            user.password = "password123"

            expect(user).to be_valid
        end

        it 'is valid if email has no duplicate from records' do
            user = User.new
            user.email = "test1@test.com"
            user.name = "test01"
            user.password = "password1"

            user2 = User.new
            user.email = "test2@test.com"
            user.name = "test02"
            user.password = "password2"

            expect(user).to be_valid
        end

        it 'is valid if it has a correct email format' do 
            user = User.new
            user.email = "test1@test.com"
            user.name = "test01"
            user.password = "password1"

            expect(user).to be_valid
        end

        it 'is valid if all parameters has been filled (name, email, password)' do
            user = User.new
            user.email = "test1@test.com"
            user.name = "test01"
            user.password = "password1"

            expect(user).to be_valid
        end

        it 'is valid if name length is at least 5 characters, and password length is at least 6 characters' do
            user = User.new
            user.email = "test1@test.com"
            user.name = "test01"
            user.password = "password1"

            expect(user).to be_valid
        end
    end

    context 'User association with Trader' do
        it 'should define a has_one relationship' do 
            user = User.reflect_on_association(:trader)

            expect(user.macro).to eq(:has_one)
        end
    end
    
    context 'User association with Admin' do
        it 'should define a has_one relationship' do 
            user = User.reflect_on_association(:admin)

            expect(user.macro).to eq(:has_one)
        end
    end
end