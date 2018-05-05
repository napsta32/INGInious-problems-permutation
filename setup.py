#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages
from os import system
from sys import argv
from shutil import which

import inginious_blockly

yarnInstalled = which('yarn') != None
npmInstalled = which('npm') != None

if not yarnInstalled and not npmInstalled:
    print("To build this plugin you require to have installed node.")
    pass
elif not yarnInstalled:
    print("It is recommended to have installed yarn to build this project.")

if not '--no-build' in argv:
    
    if yarnInstalled:
        system("cd permutation-task && yarn install")
        system("cd permutation-studio && yarn install")
    elif npmInstalled:
        system("cd permutation-task && npm install")
        system("cd permutation-studio && npm install")
    
    if yarnInstalled:
        system("cd permutation-task && yarn run build")
        system("cd permutation-studio && yarn run build")
    elif npmInstalled:
        system("cd permutation-task && npm run-script build")
        system("cd permutation-studio && npm run-script build")
else:
    argv.remove("--no-build")

setup(
    name="inginious-problems-permutation",
    version="0.3.dev0",
    description="Plugin to add a permutation problem type",
    packages=find_packages(),
    install_requires=["inginious>=0.5.dev0"],
    tests_require=[],
    extras_require={},
    scripts=[],
    include_package_data=True,
    author="The INGInious authors",
    author_email="inginious@info.ucl.ac.be",
    license="AGPL 3",
    url="https://github.com/napsta32/INGInious-problems-permutation"
)
