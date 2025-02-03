// Listen for commands from the popup
window.addEventListener('message', (event) => {
    if (event.data.type === 'VOICE_COMMAND') {
      const command = event.data.command;
      handleCommand(command);
    }
  });
  
  // Execute actions based on the command
  function handleCommand(command) {
    if (command.includes('click')) {
      const targetText = command.replace('click', '').trim();
      const buttons = Array.from(document.querySelectorAll('button, a, input[type="button"]'));
      const targetButton = buttons.find(btn => 
        btn.innerText.toLowerCase().includes(targetText)
      );
      if (targetButton) {
        targetButton.click();
        console.log(`Clicked: ${targetText}`);
      }
    }
    
    // Add more commands (e.g., "fill", "scroll") here
  }