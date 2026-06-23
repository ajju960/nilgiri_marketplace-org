
# Install dependencies as needed:
# pip install kagglehub[pandas-datasets] pandas
import kagglehub
from kagglehub import KaggleDatasetAdapter
import pandas as pd

# Set the path to the file you'd like to load
file_path = ""

try:
    # Load the latest version
    print("Loading dataset...")
    df = kagglehub.load_dataset(
      KaggleDatasetAdapter.PANDAS,
      "berkayalan/ecommerce-sales-dataset",
      file_path,
    )

    print("Dataset Loaded Successfully.")
    print("Columns:", df.columns.tolist())
    print("\nFirst 5 records:")
    print(df.head().to_string())
    
    # Save a sample to inspect
    df.head(20).to_json("sample_data.json", orient="records")
    print("\nSample data saved to sample_data.json")

except Exception as e:
    print(f"Error loading dataset: {e}")
