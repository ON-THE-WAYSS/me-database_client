import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useAuthContext } from '../../../Context/AuthContext/AuthContext';
import fetcher from '../../../utils/Helpers/Fetcher/fetchApi';
import Toaster from '../../../components/Toaster/Toaster';

const SingleMeAddProduct = ({ meId }: any) => {
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuthContext();
  const [categorySelect, setCategorySelect] = useState(true);
  const [category, setCategory] = useState<any>([]);
  const [product, setProduct] = useState<any>({});
  const [productImage, setProductImage] = useState<any>([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (!category.length) {
      setLoading(true);
      (async () => {
        const data = await fetcher.get('/api/v1/category', token);
        if (data.success) {
          setLoading(false);
          setCategory(data.data);
        }
        setLoading(false);
      })();
    }
  }, []);

  const handleAddProduct = async () => {
    if (!meId) {
      alert('Create or select Me first');
      return;
    }
    const formData = new FormData();
    formData.append('me_id', meId);
    if (user.user_id) {
      formData.append('created_by', user.user_id.toString());
    }

    if (!productImage.length) {
      alert('Provide atleast one image');
    }
    Object.keys(product).forEach((item) => {
      formData.append(item, product[item]);
    });

    productImage.forEach((item: any) => {
      formData.append('product_image', item);
    });
    setLoading(true);
    const data = await fetcher.post({
      url: '/api/v1/product',
      body: formData,
      token,
    });
    if (data.success) {
      Toaster().fire({
        icon: 'success',
        title: data.message,
      });
      setLoading(false);
      setProduct({});
      setProductImage([]);
    } else {
      Toaster().fire({
        icon: 'error',
        title: data.message,
      });
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.length < 3) {
      alert('Provide valid category name!');
      return;
    }
    setLoading(true);
    const data = await fetcher.post({
      url: '/api/v1/category',
      body: { name: newCategory },
      token,
    });
    if (data.success) {
      Toaster().fire({
        icon: 'success',
        title: data.message,
      });
      setCategory([...category, { id: data.data.id, name: newCategory }]);
      setNewCategory('');
      setLoading(false);
    } else {
      setLoading(false);
      Toaster().fire({
        icon: 'error',
        title: data.message,
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <TextField
          margin='normal'
          fullWidth
          required
          id='pName'
          label='Product name'
          onChange={(e: any) =>
            setProduct({ ...product, name: e.target.value })
          }
          type='text'
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Button
          variant='outlined'
          sx={{ mb: 1 }}
          onClick={() => setCategorySelect(!categorySelect)}
        >
          {categorySelect ? 'Add Category' : 'Select Category'}
        </Button>
        {categorySelect ? (
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={category}
            onChange={(_e, data) =>
              setProduct({ ...product, category_id: data.id })
            }
            getOptionLabel={(option: any) => option.name}
            renderInput={(params) => (
              <TextField {...params} label='Select category' />
            )}
          />
        ) : (
          <Grid container alignItems='center' gap={2}>
            <Grid item xs={8}>
              <TextField
                margin='normal'
                fullWidth
                required
                id='details'
                value={newCategory}
                label='Category name'
                onChange={(e) => setNewCategory(e.target.value)}
                type='text'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant='outlined' onClick={handleAddCategory}>
                Add
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} lg={12}>
        <TextField
          margin='normal'
          fullWidth
          required
          id='details'
          label='Product Details'
          onChange={(e: any) =>
            setProduct({ ...product, details: e.target.value })
          }
          type='text'
          variant='outlined'
          multiline
          rows={4}
        />
        <FormControlLabel
          control={
            <Checkbox
              color='secondary'
              onChange={(e) =>
                setProduct({ ...product, is_perishable: e.target.checked })
              }
              name='saveCard'
              value='yes'
            />
          }
          label='Perishable ?'
        />
        <FormControlLabel
          control={
            <Checkbox
              color='secondary'
              onChange={(e) =>
                setProduct({ ...product, need_certification: e.target.checked })
              }
              name='saveCard'
              value='yes'
            />
          }
          label='Product certification needed?'
        />
      </Grid>
      <Grid item xs={12}>
        <Box display='flex' flexWrap='wrap' gap={2}>
          {productImage.map((image: any) => {
            return (
              <Box border='1px solid black'>
                <img
                  width={100}
                  src={URL.createObjectURL(image)}
                  alt='Selected File'
                />
              </Box>
            );
          })}
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          margin='normal'
          id='filled-size-small'
          variant='outlined'
          type='file'
          label='Upload product image'
          onChange={(e: any) =>
            setProductImage([...productImage, e.target.files[0]])
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        {loading ? (
          <Button disabled variant='contained'>
            Please wait...
          </Button>
        ) : (
          <Button onClick={handleAddProduct} variant='contained'>
            Add Product
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default SingleMeAddProduct;
