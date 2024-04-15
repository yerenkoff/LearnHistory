import telebot
import os
import requests

token = ('5890593237:AAEVEH5_oZWlmj8b6P22MzB0TaOPfWblo5M')

bot = telebot.TeleBot(token)


@bot.message_handler(commands=['greet', 'start'])
def greet(message):
    msg = ''' Hello, how are you? 
Send /meow to get a cat image.
Send /fact to get random Cat Fact.'''
    bot.send_message(message.chat.id, msg)


# def main():
bot.polling()

# if __name__ == 'main':
    # main()