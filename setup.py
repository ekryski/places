from setuptools import setup, find_packages

setup(
    name='project',
    packages=find_packages(),
    install_requires=[
        'flask',
        'pysqlite',
    ],
)

