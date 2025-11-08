from setuptools import setup, find_packages

setup(
    name='lmsservice_db',
    version="0.1.0",
    package_dir={"": "src"},
    packages=find_packages(where="src"), 
    include_package_data=True,
    package_data={
        "lmsservice_db": ["config.json"]},
    install_requires=[
        "requests", 
    ],
    python_requires=">=3.6",
)
