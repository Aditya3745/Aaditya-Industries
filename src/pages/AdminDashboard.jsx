import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, LogOut, UploadCloud, Edit2, X, MessageSquare, Package, CheckCircle, ArrowUp, ArrowDown, Eye, EyeOff, Printer } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'inquiries'
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State for Products
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Executive');
  const [badge, setBadge] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [materials, setMaterials] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [weightCapacity, setWeightCapacity] = useState('');
  const [colors, setColors] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Fetch Products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch Inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (inquiriesError) throw inquiriesError;
      setInquiries(inquiriesData || []);

    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Executive');
    setBadge('');
    setIsVisible(true);
    setMaterials('');
    setDimensions('');
    setWeightCapacity('');
    setColors('');
    setImageFiles([]);
    setEditingId(null);
  };

  const handleEditClick = (product) => {
    setTitle(product.title || '');
    setDescription(product.description || '');
    setCategory(product.category || 'Executive');
    setBadge(product.badge || '');
    setIsVisible(product.is_visible ?? true);
    setMaterials(product.materials || '');
    setDimensions(product.dimensions || '');
    setWeightCapacity(product.weight_capacity || '');
    setColors(product.colors || '');
    setImageFiles([]); // Require uploading new files if editing images
    setEditingId(product.id);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill required fields (Title, Description).");
      return;
    }

    setIsSubmitting(true);
    try {
      let publicUrls = [];

      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `product_images/${fileName}`;

          const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
          publicUrls.push(publicUrl);
        }
      }

      const productData = {
        title,
        description,
        category,
        badge,
        is_visible: isVisible,
        materials,
        dimensions,
        weight_capacity: weightCapacity,
        colors
      };

      if (editingId) {
        if (publicUrls.length > 0) productData.images = publicUrls;
        const { error } = await supabase.from('products').update(productData).eq('id', editingId);
        if (error) throw error;
        alert('Product updated successfully!');
      } else {
        if (publicUrls.length === 0) {
          alert("Please select at least one image.");
          setIsSubmitting(false);
          return;
        }
        productData.images = publicUrls;
        productData.display_order = products.length; // Add to end
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
        alert('Product added successfully!');
      }
      
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error saving product: ", error);
      alert('Error saving product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchData();
      if (editingId === id) resetForm();
    }
  };

  const moveProduct = async (index, direction) => {
    if (direction === -1 && index === 0) return;
    if (direction === 1 && index === products.length - 1) return;

    const currentProd = products[index];
    const swapProd = products[index + direction];

    // Swap display_orders
    await supabase.from('products').update({ display_order: swapProd.display_order || index }).eq('id', currentProd.id);
    await supabase.from('products').update({ display_order: currentProd.display_order || (index + direction) }).eq('id', swapProd.id);
    
    fetchData();
  };

  const toggleVisibility = async (product) => {
    await supabase.from('products').update({ is_visible: !product.is_visible }).eq('id', product.id);
    fetchData();
  };

  const markInquiryContacted = async (id, currentStatus) => {
    const newStatus = currentStatus === 'New' ? 'Contacted' : 'New';
    await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
    fetchData();
  };

  const deleteInquiry = async (id) => {
    if (window.confirm('Delete this inquiry permanently?')) {
      await supabase.from('inquiries').delete().eq('id', id);
      fetchData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loading) return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading CRM...</div>;

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', padding: '2rem' }}>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-section, #print-section * {
            visibility: visible;
          }
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            box-shadow: none !important;
          }
          .hide-on-print {
            display: none !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Command Center</h1>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--surface-border)', borderRadius: '4px', cursor: 'pointer' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setActiveTab('products')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'products' ? 'var(--primary)' : 'white', color: activeTab === 'products' ? 'white' : 'var(--text-secondary)' }}>
            <Package size={20} /> Manage Products
          </button>
          <button onClick={() => setActiveTab('inquiries')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'inquiries' ? 'var(--primary)' : 'white', color: activeTab === 'inquiries' ? 'white' : 'var(--text-secondary)' }}>
            <MessageSquare size={20} /> 
            Customer Inquiries 
            {inquiries.filter(i => i.status === 'New').length > 0 && (
              <span style={{ background: '#ef4444', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.75rem' }}>{inquiries.filter(i => i.status === 'New').length}</span>
            )}
          </button>
        </div>

        {activeTab === 'products' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            {/* Add/Edit Product Form */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  {editingId ? <Edit2 size={20} /> : <Plus size={20} />} {editingId ? 'Edit Product' : 'New Product'}
                </h2>
                {editingId && <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>}
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Basic Info */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Title *</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                    <option>Executive</option>
                    <option>Ergonomic</option>
                    <option>Mesh</option>
                    <option>Conference</option>
                    <option>Lounge</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Badge (Optional, e.g. "Bestseller")</label>
                  <input type="text" value={badge} onChange={e => setBadge(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Description *</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} required rows="3" style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }} />
                </div>

                {/* Specs */}
                <div style={{ borderTop: '1px solid #e5e7eb', margin: '1.5rem 0', paddingTop: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Specifications (Optional)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem' }}>Materials</label>
                      <input type="text" value={materials} onChange={e => setMaterials(e.target.value)} placeholder="e.g. Italian Leather" style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem' }}>Colors</label>
                      <input type="text" value={colors} onChange={e => setColors(e.target.value)} placeholder="e.g. Black, Brown" style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem' }}>Weight Capacity</label>
                      <input type="text" value={weightCapacity} onChange={e => setWeightCapacity(e.target.value)} placeholder="e.g. 150 kg" style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem' }}>Dimensions</label>
                      <input type="text" value={dimensions} onChange={e => setDimensions(e.target.value)} placeholder="e.g. 60x60x120 cm" style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }} />
                    </div>
                  </div>
                </div>

                {/* Visibility & Images */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <input type="checkbox" id="visible" checked={isVisible} onChange={e => setIsVisible(e.target.checked)} />
                  <label htmlFor="visible" style={{ fontWeight: '500' }}>Visible to Public Website</label>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Upload Images (Multiple)</label>
                  <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', width: '100%' }}>
                    <button type="button" style={{ width: '100%', padding: '0.75rem', border: '1px dashed #cbd5e1', borderRadius: '4px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <UploadCloud size={18} /> {imageFiles.length > 0 ? `${imageFiles.length} files selected` : (editingId ? 'Select new images to replace old' : 'Choose images...')}
                    </button>
                    <input type="file" multiple accept="image/*" onChange={e => setImageFiles(Array.from(e.target.files))} style={{ position: 'absolute', left: 0, top: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                  </div>
                </div>
                
                <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '0.75rem', background: editingId ? '#10b981' : 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                  {isSubmitting ? 'Saving...' : (editingId ? 'Update Product' : 'Publish Product')}
                </button>
              </form>
            </div>

            {/* Product List */}
            <div id="print-section" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Live Catalog ({products.length})</h2>
                <button className="hide-on-print" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  <Printer size={16} /> Print Catalog
                </button>
              </div>
              {products.length === 0 ? <p>No products yet.</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {products.map((product, index) => (
                    <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: editingId === product.id ? '2px solid var(--primary)' : '1px solid #e5e7eb', borderRadius: '4px', opacity: product.is_visible ? 1 : 0.6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="hide-on-print" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <button onClick={() => moveProduct(index, -1)} disabled={index === 0} style={{ border: 'none', background: 'none', cursor: index === 0 ? 'default' : 'pointer', color: index === 0 ? '#cbd5e1' : '#64748b' }}><ArrowUp size={16} /></button>
                          <button onClick={() => moveProduct(index, 1)} disabled={index === products.length - 1} style={{ border: 'none', background: 'none', cursor: index === products.length - 1 ? 'default' : 'pointer', color: index === products.length - 1 ? '#cbd5e1' : '#64748b' }}><ArrowDown size={16} /></button>
                        </div>
                        <img src={product.images?.[0]} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>{product.title}</h4>
                            {product.badge && <span style={{ background: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>{product.badge}</span>}
                            {!product.is_visible && <span style={{ background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>DRAFT</span>}
                          </div>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{product.category} &bull; {product.images?.length || 0} Images</p>
                        </div>
                      </div>
                      <div className="hide-on-print" style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => toggleVisibility(product)} style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', padding: '0.5rem' }} title="Toggle Visibility">
                          {product.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button onClick={() => handleEditClick(product)} style={{ border: 'none', background: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.5rem' }} title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Inquiries Tab */
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Customer Inquiries</h2>
            {inquiries.length === 0 ? <p style={{ color: 'var(--text-secondary)' }}>No inquiries yet.</p> : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {inquiries.map(inquiry => (
                  <div key={inquiry.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', borderLeft: inquiry.status === 'New' ? '4px solid #ef4444' : '4px solid #10b981' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem' }}>{inquiry.name}</h3>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
                          <a href={`mailto:${inquiry.email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{inquiry.email}</a> &bull; 
                          <a href={`tel:${inquiry.phone}`} style={{ color: 'var(--primary)', textDecoration: 'none', marginLeft: '0.5rem' }}>{inquiry.phone}</a>
                        </p>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      "{inquiry.message}"
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button 
                        onClick={() => markInquiryContacted(inquiry.id, inquiry.status)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: inquiry.status === 'New' ? '#10b981' : '#e2e8f0', color: inquiry.status === 'New' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        <CheckCircle size={16} /> {inquiry.status === 'New' ? 'Mark Contacted' : 'Mark Unread'}
                      </button>
                      <button onClick={() => deleteInquiry(inquiry.id)} style={{ padding: '0.5rem 1rem', border: '1px solid #fee2e2', borderRadius: '4px', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
