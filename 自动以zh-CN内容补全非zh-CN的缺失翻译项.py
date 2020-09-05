#!/usr/bin/python3

import json
import os
import time

translations = {}
cwd = os.getcwd()
translations_folder_path = cwd + "/language"


def print_log(log, category="INFO", style="0;30"):
    print("\033[{0}m{1} [{2}] {3}\033[0m".format(
        style, time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()), category, log))


def load_all_translations():
    dir_list = os.listdir(translations_folder_path)
    for current_dir in dir_list:
        current_dir_path = os.path.join(translations_folder_path, current_dir)
        if os.path.isdir(current_dir_path):
            file_list = os.listdir(current_dir_path)
            translations[current_dir] = {}
            for current_file in file_list:
                current_file_path = os.path.join(current_dir_path, current_file)
                if os.path.isfile(current_file_path) and \
                        current_file_path[current_file_path.rfind('.') + 1:].lower() == 'json':
                    with open(current_file_path, 'r') as f:
                        trans = translations[current_dir]
                        try:
                            trans[current_file[:current_file.rfind('.')]] = json.load(f)
                            print_log("Translation file loaded: {0}:{1}".format(current_dir, current_file))
                        except json.JSONDecodeError:
                            print_log(
                                "Failed to load translation file(JSONDecodeError): {0}:{1}. Continue? (y/N)".format(
                                    current_dir, current_file),
                                category="WARN", style="0;33"
                            )
                            whether_continue = input()
                            if whether_continue.lower() == "y":
                                trans[current_file[:current_file.rfind('.')]] = {}
                            else:
                                exit()


def compare_all_translations_with_zh_cn():
    for translation_code in translations.keys():
        if translation_code != "zh-CN":
            compare_all_translations_with_zh_cn_step_page_code(translation_code)


def compare_all_translations_with_zh_cn_step_page_code(translation_code: str):
    for page_code in translations["zh-CN"].keys():
        print_log("Comparing {0}:{1} with zh-CN:{1}".format(translation_code, page_code))
        if page_code in translations[translation_code]:
            compare_all_translations_with_zh_cn_step_translation_key(translation_code, page_code)
        else:
            print_log(
                "Cannot find page translation for {0} in {1}".format(page_code, translation_code),
                category="WARN", style="0;33"
            )
            print_log(
                "Creating initial page translation for {0} in {1}".format(page_code, translation_code),
                style="0;32"
            )
            with open(os.path.join(translations_folder_path, translation_code, page_code + ".json"), 'w') as f:
                json.dump(translations["zh-CN"][page_code], f, ensure_ascii=False, indent=2)


def compare_all_translations_with_zh_cn_step_translation_key(translation_code: str, page_code: str):
    for translation_key in translations["zh-CN"][page_code].keys():
        if translation_key not in translations[translation_code][page_code]:
            print_log(
                "Cannot find page translation key {0} in {1} in {2}".format(
                    translation_key, page_code, translation_code),
                category="WARN", style="0;33"
            )
            print_log(
                "Creating initial page translation key {0} in {1} in {2}".format(
                    translation_key, page_code, translation_code),
                style="0;32"
            )
            translations[translation_code][page_code][translation_key] = \
                translations["zh-CN"][page_code][translation_key]
            with open(os.path.join(translations_folder_path, translation_code, page_code + ".json"), 'w') as f:
                json.dump(translations[translation_code][page_code], f, ensure_ascii=False, indent=2)


load_all_translations()
compare_all_translations_with_zh_cn()
print_log("Done.", style="0;32")
