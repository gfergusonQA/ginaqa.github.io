from flask import Flask, request, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_program', methods=['POST'])
def run_program():
    user_input = request.form['user_input']
    
    # Write the user input to a file if needed or pass it directly to the program
    with open('input.txt', 'w') as f:
        f.write(user_input)

    # Run the C++ program
    result = subprocess.run(['./output'], capture_output=True, text=True)

    # Read the output from the program
    program_output = result.stdout

    return render_template('index.html', output=program_output)

if __name__ == '__main__':
    app.run(debug=True)
