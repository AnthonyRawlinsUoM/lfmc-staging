
# coding: utf-8

# In[4]:


import xarray as xr
import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from ftplib import FTP

KBDI_from_BOM_file = './IDV71147_VIC_KBDI_SFC.nc'
KBDI_from_BOM_ftp = 'ftp://ftp.bom.gov.au/register/bom023/rKCm6dbQ/adfd/IDV71147_VIC_KBDI_SFC.nc.gz'

ftp = FTP('ftp.bom.gov.au')
ftp.login()
ftp.cwd('register/bom023/rKCm6dbQ/adfd')
ftp.retrlines('LIST')
ftp.retrbinary('RETR IDV71147_VIC_KBDI_SFC.nc.gz', open('IDV71147_VIC_KBDI_SFC.nc.gz', 'wb').write)
ftp.quit()


# In[5]:


import gzip
with gzip.open('IDV71147_VIC_KBDI_SFC.nc.gz') as f:
    content = f.read()


# In[6]:


# Read the todays KBDI for Victoria
fh = xr.open_dataset(content)


# In[7]:


# Today only
kbdi = fh['KBDI_SFC'][:][:][1]

df = kbdi.to_dataframe()


# In[8]:


# Remove coords that are NaN
df = df[np.isfinite(df['KBDI_SFC'])]


# In[9]:


# Export CSV file
df.to_csv('./kbdi.csv')


# In[10]:


fig = plt.figure(figsize=(12,6))
plt.title(str(kbdi.attrs['long_name']))
kbdi.plot()
plt.show()


# In[ ]:




