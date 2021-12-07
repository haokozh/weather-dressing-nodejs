const preview = () => {
  previewImage.src = URL.createObjectURL(event.target.files[0]);
};

const resetForm = () => {
  document.querySelector('upload-form').reset();
};
