# -*- coding: utf-8 -*-
# @Author: song

from PIL import Image
import pytesseract, os


file_name = "img_code.png"

def get_code(file_name):
	dir_path = os.path.abspath(os.path.dirname(__file__))
	image_path = dir_path + "/" + file_name
	text = pytesseract.image_to_string(Image.open(image_path))
	print(text)
	return text


if __name__ == "__main__":
	get_code(file_name)