import json
import random
import time
import os


def generate_random_values():
    return {
        "pH": round(random.uniform(0, 14), 2),
        "turbidity": round(random.uniform(0, 1000), 2),
        "BOD": round(random.uniform(0, 500), 2),
        "NH4": round(random.uniform(0, 100), 2),
        "timestamp": int(time.time())
    }


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    filename = 'data.json'
    filepath = os.path.join(script_dir, filename)

    while True:
        new_data = generate_random_values()

        try:
            # Read existing data
            if os.path.exists(filepath):
                with open(filepath, 'r') as file:
                    file_content = file.read()
                    if file_content:
                        try:
                            data = json.loads(file_content)
                        except json.JSONDecodeError:
                            print("Invalid JSON in file. Starting with empty list.")
                            data = []
                    else:
                        print("File is empty. Starting with empty list.")
                        data = []
            else:
                print("File doesn't exist. Creating new file.")
                data = []

            # Append new data
            data.append(new_data)

            # Write updated data back to file
            with open(filepath, 'w') as file:
                json.dump(data, file, indent=2)

            print(f"New entry added to {filepath}: {new_data}")
        except IOError as e:
            print(f"An error occurred while writing to the file: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

        time.sleep(1)  # Generate new values every second


if __name__ == "__main__":
    main()
