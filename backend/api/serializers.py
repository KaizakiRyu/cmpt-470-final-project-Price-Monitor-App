from rest_framework import serializers
from .models import Product, ProductLinkPrice, Comment
from rest_framework.validators import UniqueValidator

# class RegistrationSerializer(serializers.ModelSerializer):
#
# 	password2= serializers.CharField(style={'input_type': 'password'}, write_only=True)
#
# 	class Meta:
# 		model = Account
# 		fields = ['email', 'username', 'password', 'password2']
# 		extra_kwargs = {
# 				'password': {'write_only': True},
# 		}
#
# 	def	save(self):
#
# 		account = Account(
# 					email=self.validated_data['email'],
# 					username=self.validated_data['username']
# 				)
# 		password = self.validated_data['password']
# 		password2 = self.validated_data['password2']
# 		if password != password2:
# 			raise serializers.ValidationError({'password': 'Passwords must match.'})
# 		account.set_password(password)
# 		account.save()
# 		return account
#

class ProductLinkPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductLinkPrice
        fields = ('id', 'product_url', 'product_price_curr', 'product_price_prev',)
        extra_kwargs = {
            'product_url': {'validators': [UniqueValidator(queryset=ProductLinkPrice.objects.all())]},
        }

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'username', 'text')

class ProductSerializer(serializers.ModelSerializer):
    product_link_price = ProductLinkPriceSerializer(required=False, many=True)
    comments = CommentSerializer(required=False, many=True)
    product_lowest_price_curr = serializers.ReadOnlyField()
    product_lowest_price_prev = serializers.ReadOnlyField()
    
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'product_description', 'product_type', 'product_image', 'product_lowest_price_curr', 'product_lowest_price_prev', 'product_link_price', 'comments',]
        #First, create product instance, then product_link_price instance
        #Each dictionary of the list has keys called 'url' and 'price'
        #Each ProductLinkPrice needs to be associated with the Product 
        #   ->use the loop to add the Product to each dictionary
    # def create(self, validated_data):
    #     product_link_price_validated = validated_data.pop('product_link_price')
    #     product = Product.objects.create(**validated_data)
    #     for new_product_link_price in product_link_price_validated:
    #         ProductLinkPrice.objects.create(product=product, **new_product_link_price)
    #     return product

    # def update(self, instance, validated_data):

    #     product_link_price_validated = validated_data.pop('product_link_price')
    #     current_link_prices = (instance.product_link_price).all() 
    #     current_link_prices = list(current_link_prices)
        
    #     #Saving model
    #     instance.product_name = validated_data.get('product_name', instance.product_name)
    #     instance.product_description = validated_data.get('product_description', instance.product_description)
    #     instance.product_type = validated_data.get('product_type', instance.product_type)
    #     instance.product_image = validated_data.get('product_image', instance.product_image)
    #     instance.save()

    #     #Saving new nested model
    #     for product_link_price in product_link_price_validated:
    #         if current_link_prices != []:
    #             new_product_link_price = current_link_prices.pop(0)
    #             new_product_link_price.product_url = product_link_price.get('product_url', new_product_link_price.product_url)
    #             new_product_link_price.product_price_curr = product_link_price.get('product_price_curr', new_product_link_price.product_price_curr)
    #             new_product_link_price.product_price_prev = product_link_price.get('product_price_prev', new_product_link_price.product_price_prev)
    #             new_product_link_price.save()
    #         else:
    #             ProductLinkPrice.objects.create(product=instance, **product_link_price)
        
    #     #Deleting old urls that are not in the new version
    #     if len(current_link_prices) > 0:
    #         for link_price in current_link_prices:
    #             ProductLinkPrice.objects.filter(product_url=link_price.product_url).delete()
    #     return instance
